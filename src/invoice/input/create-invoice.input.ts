import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatusEnum } from '../invoice.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ItemInfoInput } from '../invoice.type';

export class CreateInvoiceInput {

    @IsNotEmpty()
    @ApiProperty({ type: [ItemInfoInput] })
    productInfo: ItemInfoInput[];

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    userId: string;

    @IsNotEmpty()
    @IsEnum(InvoiceStatusEnum)
    @ApiProperty({ enum: InvoiceStatusEnum })
    status: InvoiceStatusEnum;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    totalPrice: number;
}
