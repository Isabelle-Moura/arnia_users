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
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPetDto: CreatePetDto, @Req() req: Request) {
    const user = req['user'];
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
  findMyPets(@Req() req: Request) {
    const user = req['user'];
    return this.petsService.findMyPets(+user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') petId: number,
    @Body() updatePetsDto: UpdatePetDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.petsService.update(+petId, updatePetsDto, user.id);
  }
}
