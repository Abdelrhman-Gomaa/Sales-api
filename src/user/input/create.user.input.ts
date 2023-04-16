import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches, MaxLength, MinLength, minLength } from "class-validator";


export class CreateUserInput {
    
    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too week'}
    ) //uppercase , lowercase , number or spezial character
    @ApiProperty()
    readonly password: string;

    @IsBoolean()
    @ApiProperty()
    readonly isAdmin: boolean;

    @IsString()
    @ApiProperty()
    readonly nation: string;

    @IsString()
    @ApiProperty()
    readonly phoneNumber: string;

}
