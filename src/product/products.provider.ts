import { PRODUCTS_REPOSITORY } from 'src/database/database.model.patterns';
import { Product } from './models/product.model';

export const ProductsProvider = [
    {
      provide: PRODUCTS_REPOSITORY,
      useValue: Product,
    }
  ];
  