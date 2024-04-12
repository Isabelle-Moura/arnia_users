import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

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

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'test@example.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const user = { email: 'test@example.com', password: 'wrongpassword' };
      usersService.findByEmail.mockResolvedValue(user);

      await expect(
        authService.login({ email: 'test@example.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return a valid access token if credentials are valid', async () => {
      const user = { id: 1, email: 'test@example.com', password: '123456' };
      usersService.findByEmail.mockResolvedValue(user);

      const result = await authService.login({
        email: 'test@example.com',
        password: '123456',
      });
      expect(result.accessToken).toBeDefined();
    });
  });
});
