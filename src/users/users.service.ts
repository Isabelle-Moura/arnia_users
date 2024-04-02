import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = this.usersRepository.create(payload);

    await this.usersRepository.save(newUser);

    return newUser;
  }

  findAll(isActive?: boolean) {
    return this.usersRepository.find({ where: { isActive } });
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: {
          email,
        },
        select: {
          createdAt: true,
          email: true,
          id: true,
          isActive: true,
          password: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userToUpdate = this.findOne(id);

      await this.usersRepository.update((await userToUpdate).id, updateUserDto);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.findOne(id);

      this.usersRepository.update(id, { isActive: false });

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async profile(id: number) {
    try {
      const user = this.usersRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          address: true,
          pets: true,
          events: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
