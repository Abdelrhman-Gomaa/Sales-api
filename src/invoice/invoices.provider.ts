import { Repositories } from 'src/database/database.model.repositories';
import { Invoice } from './models/invoice.model';

export const InvoicesProvider = [
  {
    provide: Repositories.InvoicesRepository,
    useValue: Invoice,
  }
];
