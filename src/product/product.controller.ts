import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput } from './input/create-product.input';
import { UpdateProductInput } from './input/update-product.input';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: "Create One New Product" })
  @Post()
  create(@Body() input: CreateProductInput) {
    return this.productService.createProduct(input);
  }

  @ApiOperation({ summary: "Find All Products" })
  @Get()
  findAll() {
    return this.productService.findAllProduct();
  }

  @ApiOperation({ summary: "Find One Product" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @ApiOperation({ summary: "Update Specific Product" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateProductInput) {
    return this.productService.updateProduct(id, input);
  }

  @ApiOperation({ summary: "Delete Specific Product" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
