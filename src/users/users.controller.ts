import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserDto } from '../decorators/dto/current-user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDocs } from 'src/docs/users/create-user.docs';
import { UserResponseDocs } from 'src/docs/users/user-res.docs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    type: CreateUserDocs,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserResponseDocs,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('isActive') isActive?: boolean) {
    return this.usersService.findAll(isActive);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@CurrentUser() user: CurrentUserDto) {
    return this.usersService.profile(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: ParseIntPipe, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
