import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { loginDtoMock } from '../testing/auth/login-dto.mock';
import { token } from '../testing/auth/token.mock';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('Should return an access token', async () => {
      jest.spyOn(bcrypt, 'compare').mockReturnValue(true as any);

      const { accessToken } = await authService.login(loginDtoMock);

      expect(accessToken).toEqual(token);
    });
  });
});
