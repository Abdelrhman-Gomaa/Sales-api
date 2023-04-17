import { Default, Column, DataType, Model, PrimaryKey, Table, Unique, Validate, CreatedAt, UpdatedAt } from "sequelize-typescript";
import * as bcrypt from 'bcrypt'
import { ApiProperty } from '@nestjs/swagger';
@Table
export class User extends Model {
   
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    @ApiProperty()
    id: string;

    @Unique
    @Column(DataType.STRING)
    @ApiProperty()
    username: string;

    @Validate({isEmail: true})
    @Unique
    @Column(DataType.STRING)
    @ApiProperty()
    email: string;

    @Column(DataType.STRING)
    @ApiProperty()
    salt: string;

    @Column(DataType.STRING)
    @ApiProperty()
    password: string;

    @Column(DataType.BOOLEAN)
    @ApiProperty()
    isAdmin: boolean;

    @Column(DataType.STRING)
    @ApiProperty()
    nation: string;

    @Column(DataType.STRING)
    @ApiProperty()
    phoneNumber: string;
    
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}
