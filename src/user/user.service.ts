import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { CreateUserInput } from './input/create.user.input';
import { LoginUserInput } from './input/login.user.input';
import { User } from './model/user.model';
import { JwtPayload } from './jwt.payload.interface';
import { USERS_REPOSITORY } from 'src/database/database.model.patterns';

@Injectable()
export class UserService {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly userRepo: typeof User,
        private readonly jwtService: JwtService
    ) { }

    async findAll() {
        return await this.userRepo.findAll({ include: { all: true } });
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
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload: JwtPayload = { userId: user.id };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

    /*async changePass(changePasswordDto: ChangePasswordDto){
        const user = await this.validationUserPassword(changePasswordDto)
        
        const salt = await bcrypt.genSalt()
        const newpassword = changePasswordDto.newPassword
        const hashPassword = await bcrypt.hash(newpassword, salt)
        
                    
        //let newPass = await user.password
        try{
            user.password = hashPassword
            //return newPass
            return await this.userRepo.update({password: user.password},{where : {password : user.password}})
        }catch(error){
            return error.message
            //  throw new UnauthorizedException('Invalid Password')
            console.log(error.message)
        }
        //$2b$10$U06D9QeYFHYZmx8qeS/cQe2EGnQ8dhz6t/LS7boF0ZsF4cLHmaLNK
        
    }*/

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

}
