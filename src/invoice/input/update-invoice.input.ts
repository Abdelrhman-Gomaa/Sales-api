import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceInput } from './create-invoice.input';

export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) { }
