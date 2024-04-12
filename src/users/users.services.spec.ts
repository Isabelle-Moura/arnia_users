import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

/* 

  [] TODO: Testar todas as rotas!
  [] TODO: Fazer o Swagger.
  [] TODO: Todos os testes passados.
  [] TODO: c) Faça o DER da aplicação.

  [] FIXME: Todos os testes.
*/

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const userDto = { email: 'test@example.com', password: '123456' };
      const result = await service.create(userDto);
      expect(result).toMatchObject(userDto);
    });
  });

  describe('findAll', () => {
    it('should return an empty array if no users are found', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findByEmail', () => {
    it('should throw NotFoundException if user is not found', async () => {
      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if user is not found', async () => {
      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should throw NotFoundException if user is not found', async () => {
      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
