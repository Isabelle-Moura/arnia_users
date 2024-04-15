import { EventsService } from '../../events/events.service';

export const eventsServiceMock = {
  provide: EventsService,
  useValue: {},
};
