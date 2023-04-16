import { User } from './model/user.model';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  }
];
