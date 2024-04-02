import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Pets } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Pets]), UsersModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
