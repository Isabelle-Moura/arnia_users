import { HttpException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from 'src/entities';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Addresses)
    private addressesRepository: Repository<Addresses>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const newUser = this.addressesRepository.create(createAddressDto);

    await this.addressesRepository.save(newUser);

    return newUser;
  }

  findAll() {
    return this.addressesRepository.find();
  }

  async update(id: number, address: UpdateAddressDto) {
    try {
      const addressToUpdate = this.addressesRepository.findOne({
        where: { id },
      });

      await this.addressesRepository.update(
        (await addressToUpdate).id,
        address,
      );

      return addressToUpdate;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
