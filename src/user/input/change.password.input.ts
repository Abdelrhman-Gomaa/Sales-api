import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class ChangePasswordInput {

    @IsString()
    readonly email: string;
    
    @IsString()
    readonly password: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week'}
    ) //uppercase , lowercase , number or spezial character
    readonly newPassword: string;

}
