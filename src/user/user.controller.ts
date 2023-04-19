import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordInput } from './input/change.password.input';
import { CreateUserInput } from './input/create.user.input';
import { LoginUserInput } from './input/login.user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: "Find All User" })
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @ApiOperation({ summary: "Create A new User / Registration" })
    @Post('/register')
    async register(@Body(ValidationPipe) input: CreateUserInput) {
        return await this.userService.register(input);
    }

    @ApiOperation({ summary: "Login to App" })
    @Post('/login')
    async login(@Body(ValidationPipe) input: LoginUserInput): Promise<{ accessToken: string; }> {
        return await this.userService.signIn(input);
    }
    //@Patch()
    //@Delete()
}
