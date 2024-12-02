// DESCRIBE -> bloco de teste (conjunto de testes)
// IT or TEST -> declara um único teste unitário
// EXPECT -> verifica se o teste passou ou falhou

import '@shared/server/index';
import { Request, Response } from 'express';
import { prisma } from '@shared/database';
import { AppError } from '@shared/error/AppError';
import { UserController } from '../controller/user.controller';

describe('Create User', () => {
  const random = Math.floor(Math.random() * 1000);

  const userEmail = `exempleEmail${random}@email.com`;

  const userController = new UserController();

  it('Create user successfully', async () => {
    const request = {
      body: {
        name: 'User Test',
        email: userEmail,
        password: '123456',
      },
    } as unknown as Request;

    const reply = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.create(request, reply);

    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.json).toHaveBeenCalled();
  });
});

afterAll(() => {
  prisma.$disconnect();
});
