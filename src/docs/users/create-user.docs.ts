import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDoc {
  @ApiProperty({
    type: String,
    title: 'E-mail',
    example: 'hamster@gmail.com',
    description: `User's email at sign up.`,
  })
  email: string;

  @ApiProperty({
    type: String,
    title: 'Password',
    example: 'deoculos',
    description: `User's password at sign up.`,
  })
  password: string;
}
