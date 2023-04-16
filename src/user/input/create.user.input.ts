import { IsBoolean, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";


export class CreateUserInput {
    
    @IsString()
    readonly username: string;

    @IsString()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week'}
    ) //uppercase , lowercase , number or spezial character
    readonly password: string;

    @IsBoolean()
    readonly isAdmin: boolean;

    @IsString()
    readonly nation: string;

    @IsString()
    readonly phoneNumber: string;

    @IsString()
    readonly imageUrl?: string;

}
