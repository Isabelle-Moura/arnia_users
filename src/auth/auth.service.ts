import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto?.email);

    const comparePassword = await bcrypt.compare(
      loginDto.password,
      user?.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      iss: 'arnia_users', // issuer
      sub: 'user_authentication', // subject
      aud: 'arnia_user', // audience
      userEmail: user?.email,
      userId: user?.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
