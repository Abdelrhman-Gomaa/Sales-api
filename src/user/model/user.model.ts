import { Default, Column, DataType, Model, PrimaryKey, Table, Unique, Validate } from "sequelize-typescript";
import * as bcrypt from 'bcrypt'
@Table
export class User extends Model {
   
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    id: string;

    @Unique
    @Column(DataType.STRING)
    username: string;

    @Validate({isEmail: true})
    @Unique
    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    salt: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.BOOLEAN)
    isAdmin: boolean;

    @Column(DataType.STRING)
    nation: string;

    @Column(DataType.STRING)
    phoneNumber: string;

    @Column(DataType.STRING)
    imageUrl: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}
