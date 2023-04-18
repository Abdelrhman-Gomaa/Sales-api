import { INVOICES_REPOSITORY } from 'src/database/database.model.patterns';
import { Invoice } from './models/invoice.model';

export const InvoicesProvider = [
    {
      provide: INVOICES_REPOSITORY,
      useValue: Invoice,
    }
  ];
  