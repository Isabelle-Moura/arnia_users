import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(userMock),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    profile: jest.fn().mockResolvedValue(userMock),
  },
};
