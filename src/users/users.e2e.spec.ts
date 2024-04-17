import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuard } from '../testing/guards/auth-guard.mock';
import { userRepositoryMock } from '../testing/users/users-repository.mock';
import { UsersModule } from './users.module';
import { updateUserDtoMock } from '../testing/users/update-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { usersMock } from '../testing/users/users.mock';
import { createUserMockDto } from '../testing/users/create-user-dto.mock';
import * as request from 'supertest';

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

  describe('create', () => {
    it('/users (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMockDto);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('findAll', () => {
    it('/users (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    it('/users/:id (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users/1');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('update', () => {
    it('/users/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/1')
        .send(updateUserDtoMock);

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('delete', () => {
    it('/users/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer()).delete('/users/1');

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
    });
  });

  describe('profile', () => {
    it('/users/profile (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/users/profile');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
    });
  });
});
