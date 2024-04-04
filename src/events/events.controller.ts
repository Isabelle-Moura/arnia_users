import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/dto/current-user.dto';

/* 
   [x] a) Crie um decorator de CurrentUser para substituir nas rotas que se utiliza req.user.
   [x] b) Crie uma rota para fazer get de events.
   [] a) Crie uma rota para envio de imagens do evento.
   [] b) Crie uma rota para retornar a imagem pelo nome.

   [] Desafio -> Documente as rotas criadas até agora com Swagger.
   [] Desafio -> Faça a paginação da rota de get Pets.
   [] Desafio -> Faça uma query para filtrar por eventDate (a partir de "eventDate")- Exemplo: Eventos a partir de 31/08/2023.
   [] Desafio -> Crie uma nova entidade images (id, imageLink, enventId)
*/

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(payload: CreateEventDto) {
    return this.eventsService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Post(':id/participate')
  participate(
    @Param('id') eventId: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.eventsService.participate(eventId, user.id);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }
}
