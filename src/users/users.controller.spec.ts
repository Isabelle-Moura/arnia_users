import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            profile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the created user', async () => {
      const userDto = { email: 'test@example.com', password: '123456' };
      userService.create.mockResolvedValue(userDto);
      expect(await controller.create(userDto)).toEqual(userDto);
    });
  });

  describe('findAll', () => {
    it('should return an empty array if no users are found', async () => {
      userService.findAll.mockResolvedValue([]);
      expect(await controller.findAll(null)).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if user is not found', async () => {
      userService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if user is not found', async () => {
      userService.update.mockRejectedValue(new NotFoundException());
      await expect(controller.update('1', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if user is not found', async () => {
      userService.delete.mockRejectedValue(new NotFoundException());
      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
