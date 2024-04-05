import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events, Images } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,

    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,

    private usersService: UsersService,
    private configService: ConfigService,
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
          photos: true,
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
      throw new ConflictException('Already joined this event.');
    }

    event.participants.push(user);
    this.eventsRepository.save(event);

    return event;
  }

  async findAll(eventDate?: string) {
    if (eventDate) {
      return this.eventsRepository.find({
        where: {
          eventDate: new Date(eventDate),
        },
      });
    }
    return this.eventsRepository.find();
  }

  async uploadPhoto(id: number, file: Express.Multer.File) {
    const event = await this.findOne(id);

    if (!file) {
      throw new BadRequestException('File is not an image.');
    }

    const imageLink = `${this.configService.get('BASE_URL')}/events/photo/${file.filename}`;

    const newEventPhoto = this.imagesRepository.create({
      imageLink,
      eventId: event.id,
    });

    await this.imagesRepository.save(newEventPhoto);

    return newEventPhoto;
  }
}
