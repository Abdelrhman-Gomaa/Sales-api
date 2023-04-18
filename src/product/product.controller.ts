import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput } from './input/create-product.input';
import { UpdateProductInput } from './input/update-product.input';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() input: CreateProductInput) {
    return this.productService.createProduct(input);
  }

  @Get()
  findAll() {
    return this.productService.findAllProduct();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateProductInput) {
    return this.productService.updateProduct(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
