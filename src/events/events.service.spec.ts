import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { eventsRepositoryMock } from '../testing/events/events-repository.mock';
import { eventsPhotosRepositoryMock } from '../testing/events/events-photo-repository.mock';
import { configServiceMock } from '../testing/auth/config-service.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { eventPhotoMock } from '../testing/events/event-photo.mock';
import { getFileMock } from '../testing/events/get-file.mock';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        eventsRepositoryMock,
        eventsPhotosRepositoryMock,
        usersServiceMock,
        configServiceMock,
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('uploadPhoto', () => {
    it('Should upload an file successfully.', async () => {
      const result = await service.uploadPhoto(2, await getFileMock());

      expect(result).toEqual(eventPhotoMock);
    });
  });
});
