import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/dto/current-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPhotoConfig } from 'src/utils/upload-photo.config';
import { Response } from 'express';
import { UpdateEventDto } from './dto/update-event.dto';

/* 

  [] TODO: Testar todas as rotas!
  [] TODO: Fazer o lindo Swagger.

  [x] a) Crie uma rota para editar a data de um evento existente.
  [] b) Documente a aplicação.
  [] c) Faça o DER da aplicação.

  [] Desafio: Prepare o ambiente para teste do UserService (Mocks)

   Erros: 
   FIXME:
*/

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(payload: CreateEventDto) {
    return this.eventsService.create(payload);
  }

  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('photos', uploadPhotoConfig()))
  uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.eventsService.uploadPhoto(id, file);
  }

  @Get('photo/:filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @UseGuards(AuthGuard)
  @Post(':id/participate')
  participate(
    @Param('id') eventId: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return this.eventsService.participate(eventId, user.id);
  }

  @Get(':eventDate')
  findAll(@Param('eventDate') eventDate?: string) {
    return this.eventsService.findAll(eventDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateEventDto) {
    return this.eventsService.update(+id, payload);
  }
}
