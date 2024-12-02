// DESCRIBE -> bloco de teste (conjunto de testes)
// IT or TEST -> declara um único teste unitário
// EXPECT -> verifica se o teste passou ou falhou

import '@shared/server/index';
import { prisma } from '@shared/database';
import { app } from '@shared/server/app';
import request from 'supertest';

let server: any;

beforeAll(() => {
  prisma.$connect();
  server = app.listen(3333);
});

describe('Create User', () => {
  const random = Math.floor(Math.random() * 1000);
  const userEmail = `exempleEmail${random}@email.com`;

  it('Create user successfully', async () => {
    const response = await request(app).post('/user').send({
      name: 'User Test',
      email: userEmail,
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('Create user with the same email', async () => {
    const response = await request(app).post('/user').send({
      name: 'User Test',
      email: userEmail,
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Create user with missing data', async () => {
    const response = await request(app).post('/user').send({
      name: 'User Test',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

afterAll(() => {
  prisma.$disconnect();
  server.close();
});
