import { Test, TestingModule } from '@nestjs/testing';
import { ParseIntPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { userMock } from '../testing/users/user.mock';
import { usersMock } from '../testing/users/users.mock';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { createUserMockDto } from '../testing/users/create-user-dto.mock';
import { authGuard } from '../testing/guards/auth-guard.mock';
import { authGuardUserMock } from '../testing/guards/auth-guard-user.mock';
import { updateUserDtoMock } from '../testing/users/update-user-dto.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a new user', async () => {
      const user = await controller.create(createUserMockDto);

      expect(user).toEqual(userMock);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const userList = await controller.findAll();

      expect(userList).toEqual(usersMock);
    });
  });

  describe('profile', () => {
    it('should return my profile', async () => {
      const profile = await controller.profile(authGuardUserMock);

      expect(profile).toEqual(userMock);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = await controller.findOne('1');

      expect(user).toEqual(userMock);
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      const user = await controller.update(
        1 as unknown as ParseIntPipe,
        updateUserDtoMock,
      );

      expect(user).toEqual(userMock);
    });
  });

  describe('softDelete', () => {
    it('should return nothing', async () => {
      await controller.delete('1');

      expect(usersServiceMock.useValue.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('AuthGuard', () => {
    it('should be defined', async () => {
      const guards = Reflect.getMetadata('__guards__', controller.profile);

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(guards[0]).toBe(AuthGuard);
    });
  });
});
