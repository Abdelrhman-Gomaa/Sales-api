import { USERS_REPOSITORY } from 'src/database/database.model.patterns';
import { User } from './model/user.model';

export const UsersProvider = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  }
];
