import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuard } from '../testing/guards/auth-guard.mock';
import { userRepositoryMock } from '../testing/users/users-repository.mock';
import { UsersModule } from './users.module';

/* 
  [] TODO: Continuar o Swagger.
  [] TODO: Testar todas as rotas.
*/

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined.', () => {
    expect(app).toBeDefined();
  });

  it('should create an user', () => {});
  it('should return all users', () => {});
  it('should return one user', () => {});
  it('should update an user', () => {});
  it('should delete an user', () => {});
  it('should retunr an logged user', () => {});
});
