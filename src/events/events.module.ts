import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/entities';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Events]), UsersModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
