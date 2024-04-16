import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events, Images } from '../entities';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Images]), UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
