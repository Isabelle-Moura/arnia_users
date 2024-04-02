import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from 'src/entities/addresses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Addresses])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
