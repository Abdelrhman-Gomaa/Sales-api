import { Repositories } from 'src/database/database.model.repositories';
import { Product } from './models/product.model';

export const ProductsProvider = [
  {
    provide: Repositories.ProductsRepository,
    useValue: Product,
  }
];
