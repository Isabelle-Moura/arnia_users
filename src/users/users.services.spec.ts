import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userMock } from '../testing/users/user.mock';
import { userRepositoryMock } from '../testing/users/users-repository.mock';
import { createUserMockDto } from '../testing/users/create-user-dto.mock';
import { usersMock } from '../testing/users/users.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = await service.create(createUserMockDto);

      expect(user).toEqual(userMock);
      expect(userRepositoryMock.useValue.create).toHaveBeenCalledWith(
        createUserMockDto,
      );
    });
  });

  describe('findAll', () => {
    it('findAll', async () => {
      const users = await service.findAll();

      expect(users).toEqual(usersMock);
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      const updatedUser = await service.update(1, createUserMockDto);

      expect(updatedUser).toEqual(userMock);
    });
  });

  describe('findByEmail', () => {
    it('should return an user by e-mail', async () => {
      const user = await service.findByEmail(userMock.email);
      expect(user).toEqual(userMock);
    });
  });

  describe('delete', () => {
    it('should delete an user successfully', async () => {
      const mockDelete = jest
        .spyOn(service, 'delete')
        .mockReturnValue(true as any);
      await service.delete(1);

      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledWith(1);
    });
  });
});
