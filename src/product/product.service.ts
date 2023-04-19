import { Inject, Injectable } from '@nestjs/common';
import { CreateProductInput } from './input/create-product.input';
import { UpdateProductInput } from './input/update-product.input';
import { Repositories } from 'src/database/database.model.repositories';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @Inject(Repositories.ProductsRepository)
    private readonly productRepo: typeof Product,
  ) { }

  async createProduct(input: CreateProductInput) {
    return await this.productRepo.create({ ...input });
  }

  async findAllProduct() {
    return await this.productRepo.findAll();
  }

  async findOneProduct(id: string) {
    return await this.productRepo.findAll({ where: { id } });
  }

  async updateProduct(id: string, input: UpdateProductInput) {
    return await this.productRepo.update({ ...input }, { where: { id } });
  }

  async removeProduct(id: string) {
    return await this.productRepo.destroy({ where: { id } });
  }
}
