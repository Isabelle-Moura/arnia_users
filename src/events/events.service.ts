import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
    private usersService: UsersService,
  ) {}

  async create(payload: CreateEventDto) {
    const newEvent = this.eventsRepository.create(payload);

    await this.eventsRepository.save(newEvent);

    return newEvent;
  }

  async findOne(id: number) {
    try {
      const event = await this.eventsRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          participants: true,
        },
      });

      return event;
    } catch (error) {
      throw new NotFoundException('Event not found');
    }
  }

  async participate(eventId: number, userId: number) {
    const event = await this.findOne(eventId);

    const user = await this.usersService.findOne(userId);

    if (event.participants.find((participant) => participant.id === user.id)) {
      throw new ConflictException('Already joined the event');
    }

    event.participants.push(user);
    this.eventsRepository.save(event);

    return event;
  }

  async findAll() {
    return this.eventsRepository.find();
  }

  async uploadPhoto(file: Express.Multer.File) {
    return file;
  }
}
