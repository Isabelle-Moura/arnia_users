import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPetDto: CreatePetDto, @Req() request: Request) {
    const user = request['user'];
    return this.petsService.create(user.id, createPetDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Get()
  getPets(@Param('breed') breed?: string) {
    return this.petsService.find(breed);
  }

  @Get('my-pets')
  getMyPets() {
    return this.petsService.find();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePetsDto: UpdatePetDto,
    @Req() request: Request,
  ) {
    const user = request['user'];
    return this.petsService.update(+id, updatePetsDto, user.id);
  }
}
