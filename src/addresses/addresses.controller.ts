import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

/* 
   [] a) Crie um decorator de CurrentUser para substituir nas rotas que se utiliza req.user.
   [] b) Crie uma rota para fazer get de events.

   [] Desafio -> Documente as rotas criadas até agora com Swagger.
   [] Desafio -> Faça a paginação da rota de get Pets.
   [] Desafio -> Faça uma query para filtrar por eventDate (a partir de "eventDate")- Exemplo: Eventos a partir de 31/08/2023.
*/

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: ParseIntPipe, @Body() address: UpdateAddressDto) {
    return this.addressesService.update(+id, address);
  }
}
