import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceInput } from './input/create-invoice.input';
import { UpdateInvoiceInput } from './input/update-invoice.input';
import { Repositories } from 'src/database/database.model.repositories';
import { Invoice } from './models/invoice.model';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(Repositories.InvoicesRepository)
    private readonly invoiceRepo: typeof Invoice,
    @Inject(Repositories.ProductsRepository)
    private readonly productRepo: typeof Product,
  ) { }

  async createInvoice(currentUser: string, input: CreateInvoiceInput) {
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
    itemMapping.map(item => item.map(prod => prod != undefined ? itemInformation.push(prod) : 0));
    let totalPrice = 0;
    itemInformation.forEach(item => totalPrice += item.totalUnitPrice);
    return await this.invoiceRepo.create({
      ...input,
      userId: currentUser,
      totalPrice,
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
