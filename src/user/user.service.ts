import * as jwt from 'jsonwebtoken';
import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Op, where } from 'sequelize';
import { CreateUserInput } from './input/create.user.input';
import { LoginUserInput } from './input/login.user.input';
import { User } from './models/user.model';
import { Repositories } from 'src/database/database.model.repositories';
import { TokenPayload } from 'src/auth/auth-token-payload.interface';
import { BaseHttpException } from 'src/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/exceptions/error-code.enum';
import { ChangePasswordInput } from './input/change.password.input';
@Injectable()
export class UserService {
    constructor(
        @Inject(Repositories.UsersRepository)
        private readonly userRepo: typeof User,
    ) { }

    async findAll() {
        return await this.userRepo.findAll({ include: { all: true } });
    }

    async me(userId) {
        return await this.userRepo.findOne({ where: { id: userId } });
    }

    async register(input: CreateUserInput) {
        const existUser = await this.userRepo.findOne({
            where: {
                [Op.or]: [{ username: input.username }, { email: input.email }]
            }
        });
        if (existUser) throw new ConflictException('username or email already exist');

        const salt = await bcrypt.genSalt();
        const password = input.password;
        const hashPassword = await bcrypt.hash(password, salt);

        try {
            return await this.userRepo.create({
                username: input.username,
                email: input.email,
                salt: salt,
                password: hashPassword,
                isAdmin: input.isAdmin,
                nation: input.nation,
                phoneNumber: input.phoneNumber
            });
        } catch (error) {
            console.log(error.message);
        }

    }

    async signIn(input: LoginUserInput): Promise<{ accessToken: string; }> {
        const user = await this.validationUserPassword(input);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload: TokenPayload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
        return { accessToken };
    }

    async validationUserPassword(input: LoginUserInput) {
        const user = await this.userRepo.findOne({ where: { email: input.email } });
        if (user) {
            if (await user.validatePassword(input.password)) {
                const userValidate = {
                    id: user.id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    password: user.password
                };
                return userValidate;
            } else {
                throw new UnauthorizedException('Invalid Password');
            }
        } else {
            return null;
        }
    }

    async getUser(userId: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('Invalid User');
        return user;
    }

    async changePassword(currentUser: string, input: ChangePasswordInput) {
        const user = await this.userRepo.findOne({ where: { id: currentUser } });
        if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_USER);
        await this.matchPassword(input.oldPassword, user.password);
        if (input.newPassword !== input.confirmPassword) throw new BaseHttpException(ErrorCodeEnum.NEW_PASSWORD_NOT_CONFIRMED);
        if (input.newPassword === input.oldPassword) throw new BaseHttpException(ErrorCodeEnum.OLD_PASSWORD_AND_NEW_ARE_MATCHED);
        const hashPassword = await bcrypt.hash(input.newPassword, 12);
        return await this.userRepo.update({ password: hashPassword }, { where: { id: user.id } });
    }

    private async matchPassword(password: string, hash: string) {
        const isMatched = hash && (await bcrypt.compare(password, hash));
        if (!isMatched) throw new BaseHttpException(ErrorCodeEnum.INCORRECT_PASSWORD);
    }

}
