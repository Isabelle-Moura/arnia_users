import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/index';
import { userMock } from './user.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(Users),
  useValue: {
    create: jest.fn().mockResolvedValue(userMock),
    save: jest.fn().mockResolvedValue(userMock),
    find: jest.fn().mockResolvedValue([userMock]),
    findOne: jest.fn().mockResolvedValue(userMock),
    findOneOrFail: jest.fn().mockResolvedValue(userMock),
    update: jest.fn().mockResolvedValue(userMock),
  },
};
