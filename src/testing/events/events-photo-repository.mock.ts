import { getRepositoryToken } from '@nestjs/typeorm';
import { Images } from '../../entities';
import { eventPhotoMock } from './event-photo.mock';

export const eventsPhotosRepositoryMock = {
  provide: getRepositoryToken(Images),
  useValue: {
    create: jest.fn().mockReturnValue(eventPhotoMock),
    save: jest.fn(),
  },
};
