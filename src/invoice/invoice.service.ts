import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceInput } from './input/create-invoice.input';
import { UpdateInvoiceInput } from './input/update-invoice.input';
import { INVOICES_REPOSITORY, PRODUCTS_REPOSITORY } from 'src/database/database.model.patterns';
import { Invoice } from './models/invoice.model';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(INVOICES_REPOSITORY)
    private readonly invoiceRepo: typeof Invoice,
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productRepo: typeof Product,
  ) { }


  async createInvoice(input: CreateInvoiceInput) {
    let productIds = input.productInfo.map(product => product.productId);
    const existingProducts = await this.productRepo.findAll({ where: { id: productIds } });
    if (!existingProducts) throw new Error('Product not found');
    let itemMapping = existingProducts.map(product => {
      return input.productInfo.map(prod => {
        if (product.id === prod.productId)
          return {
            productId: product.id,
            title: product.title,
            quantity: prod.quantity,
            totalUnitPrice: (prod.quantity * product.price)
          };
      });
    });
    let itemInformation = [];
    itemMapping.map(item => { return item.map(prod => prod != undefined ? itemInformation.push(prod) : 0); });
    return await this.invoiceRepo.create({
      ...input,
      ItemInfo: itemInformation
    });
  }

  async findAllInvoice() {
    return await this.invoiceRepo.findAndCountAll();
  }

  async findUserInvoices(userId: string) {
    return await this.invoiceRepo.findAll({ where: { userId: userId } });
  }

  updateInvoice(id: string, input: UpdateInvoiceInput) {
    return `This action updates a #${id} invoice`;
  }

  async removeInvoice(id: string) {
    return await this.invoiceRepo.destroy({ where: { id } });
  }
}
