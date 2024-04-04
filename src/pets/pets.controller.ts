import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/dto/current-user.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createPetDto: CreatePetDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
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

  @UseGuards(AuthGuard)
  @Get('my-pets')
  findMyPets(@CurrentUser() user: CurrentUserDto) {
    return this.petsService.findMyPets(+user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') petId: number,
    @Body() updatePetsDto: UpdatePetDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.petsService.update(+petId, updatePetsDto, user.id);
  }
}
