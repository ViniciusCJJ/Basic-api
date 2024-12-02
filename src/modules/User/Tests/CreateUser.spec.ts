// DESCRIBE -> bloco de teste (conjunto de testes)
// IT or TEST -> declara um único teste unitário
// EXPECT -> verifica se o teste passou ou falhou

import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import { prisma } from '@shared/database';
import '@shared/providers/RedisProvider/index';
import { app } from '@shared/server/app';
import { Request, Response } from 'express';
import { AppError } from '@shared/error/AppError';
import { UserController } from '../controller/user.controller';

const PORT = process.env.PORT || 3333;

prisma.$connect();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running on port ${PORT} , URL: ${
      process.env.BASE_URL || 'http://localhost:3333'
    }`,
  );
});

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

  // it('Create user failed', async () => {
  //   // vai falhar pois o email já foi cadastrado
  //   const request = {
  //     body: {
  //       name: 'User Test',
  //       email: userEmail,
  //       password: '123456',
  //     },
  //   } as unknown as Request;

  //   const reply = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   } as unknown as Response;

  //   try {
  //     userController.create(request, reply);
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(AppError);
  //   }
  // });
});
