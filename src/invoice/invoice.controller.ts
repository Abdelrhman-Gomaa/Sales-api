import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceInput } from './input/create-invoice.input';
import { UpdateInvoiceInput } from './input/update-invoice.input';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @ApiOperation({ summary: "Create New Invoice" })
  @Post()
  createInvoice(@Body() input: CreateInvoiceInput) {
    return this.invoiceService.createInvoice(input);
  }

  @ApiOperation({ summary: "Get All Invoice" })
  @Get()
  findAllInvoice() {
    return this.invoiceService.findAllInvoice();
  }

  @ApiOperation({ summary: "Get All Invoice for One User" })
  @Get(':userId')
  findUserInvoices(@Param('userId') userId: string) {
    return this.invoiceService.findUserInvoices(userId);
  }

  @ApiOperation({ summary: "Update One Invoice" })
  @Patch(':id')
  updateInvoice(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceInput) {
    return this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }

  @ApiOperation({ summary: "Delete One Invoice" })
  @Delete(':id')
  removeInvoice(@Param('id') id: string) {
    return this.invoiceService.removeInvoice(id);
  }
}
