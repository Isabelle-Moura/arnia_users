import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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

/* 
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

  @Post(':id/upload-photo')
  @UseInterceptors(FileInterceptor('photo', uploadPhotoConfig()))
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.eventsService.uploadPhoto(file);
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

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }
}
