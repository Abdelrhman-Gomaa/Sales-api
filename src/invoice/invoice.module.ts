import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoicesProvider } from './invoices.provider';
import { ProductsProvider } from 'src/product/products.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersProvider } from 'src/user/users.provider';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...InvoicesProvider],
  exports: [InvoiceService, ...InvoicesProvider]
})
export class InvoiceModule { }
