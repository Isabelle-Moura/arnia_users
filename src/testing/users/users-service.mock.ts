import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';
import { usersMock } from './users.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(userMock),
    findAll: jest.fn().mockResolvedValue(usersMock),
    findByEmail: jest.fn(),
    findOne: jest.fn().mockResolvedValue(userMock),
    update: jest.fn(),
    delete: jest.fn(),
    profile: jest.fn().mockResolvedValue(userMock),
  },
};
