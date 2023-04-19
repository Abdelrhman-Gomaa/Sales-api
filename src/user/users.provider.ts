import { Repositories } from 'src/database/database.model.repositories';
import { User } from './models/user.model';

export const UsersProvider = [
  {
    provide: Repositories.UsersRepository,
    useValue: User,
  }
];
