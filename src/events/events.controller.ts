import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(payload: CreateEventDto) {
    return this.eventsService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Post(':id/participate')
  participate(@Param('id') eventId: number, @Req() req: Request) {
    const user = req['user'];
    return this.eventsService.participate(eventId, user.id);
  }
}
