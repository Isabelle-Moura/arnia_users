import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from 'src/entities';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private petsRepository: Repository<Pets>,
    private usersService: UsersService,
  ) {}

  async create(userId: number, createPetDto: CreatePetDto) {
    const user = await this.usersService.findOne(userId);

    const pet = this.petsRepository.create(createPetDto);

    pet.user = user;

    await this.petsRepository.save(pet);

    return pet;
  }

  findOne(id: number) {
    try {
      const pet = this.petsRepository.findOneOrFail({
        where: { id },
        relations: { user: true },
      });

      return pet;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  find(breed?: string) {
    try {
      const pets = this.petsRepository.find({ where: { breed } });

      return pets;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(petId: number, payload: UpdatePetDto, userId: number) {
    try {
      const petToUpdate = await this.findOne(petId);

      if (petToUpdate.user.id !== userId) {
        throw new UnauthorizedException('This pet belongs to other user.');
      }

      await this.petsRepository.update(petId, payload);

      return this.findOne(petId);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findMyPets(userId: number) {
    try {
      const pets = await this.petsRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      });

      return pets;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
