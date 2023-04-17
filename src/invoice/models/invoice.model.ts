import { ApiProperty } from '@nestjs/swagger';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { ItemInfoType } from '../invoice.type';
import { User } from 'src/user/models/user.model';
import { InvoiceStatusEnum } from '../invoice.enum';

@Table
export class Invoice extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({type: DataType.UUID})
    @ApiProperty()
    id: string;

    @AllowNull(false)
    @Column({ type: DataType.JSONB })
    @ApiProperty()
    ItemInfo: ItemInfoType[];

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    userId: string;
  
    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @Column({ type: DataType.ENUM('PLACED','DELIVERED','CANCELED')})
    @ApiProperty()
    status: InvoiceStatusEnum;
  
    @AllowNull(false)
    @Column({ type: DataType.INTEGER})
    totalPrice: number;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}
