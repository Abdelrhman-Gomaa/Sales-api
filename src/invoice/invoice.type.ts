import { ApiProperty } from '@nestjs/swagger';


export class ItemInfoType {

    @ApiProperty()
    productId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    quantity: string;

    @ApiProperty()
    totalUnitPrice: boolean;
}