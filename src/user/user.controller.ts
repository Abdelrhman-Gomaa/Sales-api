import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Put,
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
import { CurrentUser } from 'src/auth/auth-user.decorator';

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

    @ApiOperation({ summary: "Find Current User Data" })
    @Get('/me')
    async me(@CurrentUser() currentUser: string): Promise<User> {
        return await this.userService.me(currentUser);
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

    @ApiOperation({ summary: "Login with Phone Number to App" })
    @Patch('/changePassword')
    async changePassword(@CurrentUser() userId: string, @Body(ValidationPipe) input: ChangePasswordInput) {
        return await this.userService.changePassword(userId, input);
    }
    //@Delete()
}
