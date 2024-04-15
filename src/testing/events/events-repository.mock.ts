import { getRepositoryToken } from '@nestjs/typeorm';
import { Events } from '../../entities';
import { eventMock } from './event.mock';

export const eventsRepositoryMock = {
  provide: getRepositoryToken(Events),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn().mockResolvedValue(eventMock),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
