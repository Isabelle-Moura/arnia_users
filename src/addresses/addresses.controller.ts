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
   [] terminar! c) Faça uma rota para update de pets. Obs: Somente o usuário dono do pet pode modificá-lo.
   [] terminar! d) Faça uma rota de get -> /pets/my-pets que retorna somente os pets do usuário logado.
   [] c) Crie uma rota POST -> events.
   [] d) Crie uma rota para o usuário participar do evento. (sugestão -> /post -> /events/:id/participate).
   dica: events.paticipants.push(user)

   [] Desafio -> Documente as rotas criadas até agora com Swagger.
   [] Desafio -> Faça a paginação da rota de get Pets.
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
