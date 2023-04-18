import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoicesProvider } from './invoices.provider';
import { ProductsProvider } from 'src/product/products.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, ...InvoicesProvider, ...ProductsProvider]
})
export class InvoiceModule {}
