import * as jwt from 'jsonwebtoken';
import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { CreateUserInput } from './input/create.user.input';
import { LoginUserInput } from './input/login.user.input';
import { User } from './models/user.model';
import { Repositories } from 'src/database/database.model.repositories';
import { TokenPayload } from 'src/auth/auth-token-payload.interface';
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

}
