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

describe('User module tests', () => {
  const random = Math.floor(Math.random() * 1000);
  const userEmail = `exempleEmail${random}@email.com`;
  let token: string;
  let tokenToDestroy: string;
  let userId: string;

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

  it('Create session successfully', async () => {
    const response = await request(app).post('/user/login').send({
      email: userEmail,
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');

    token = response.body.token;
    userId = response.body.user.id;
  });

  it('Create session with invalid email', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'invalidEmail',
      password: '123456',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Create session with invalid password', async () => {
    const response = await request(app).post('/user/login').send({
      email: userEmail,
      password: 'invalidPassword',
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('Get user successfully', async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('Get user with invalid token', async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer invalidToken`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Update user successfully', async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .send({ name: 'User Test Updated' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('Update user with invalid token', async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .send({ name: 'User Test Updated' })
      .set('Authorization', `Bearer invalidToken`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Update user with invalid data', async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .send({ name: '' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Create session with token to destroy', async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await request(app).post('/user/login').send({
      email: userEmail,
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');

    tokenToDestroy = response.body.token;
  });

  it('Destroy session successfully', async () => {
    const response = await request(app)
      .delete('/user/logout')
      .set('Authorization', `Bearer ${tokenToDestroy}`);

    expect(response.status).toBe(200);
  });

  it('Destroy session without token', async () => {
    const response = await request(app).delete('/user/logout');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Change password successfully', async () => {
    const response = await request(app)
      .post(`/user/change-password/${userId}`)
      .send({ oldPassword: '123456', newPassword: '1234567' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('Change password with invalid token', async () => {
    const response = await request(app)
      .post(`/user/change-password/${userId}`)
      .send({ oldPassword: '123456', newPassword: '1234567' })
      .set('Authorization', `Bearer invalidToken`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Change password with wrong old password', async () => {
    const response = await request(app)
      .post(`/user/change-password/${userId}`)
      .send({ oldPassword: '11111', newPassword: '1234567' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Forgot password successfully', async () => {
    const response = await request(app)
      .post('/user/forgot-password')
      .send({ email: userEmail });

    expect(response.status).toBe(204);
  });

  it('Forgot password with invalid email', async () => {
    const response = await request(app)
      .post('/user/forgot-password')
      .send({ email: 'invalidEmail' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Delete user with invalid token', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer invalidToken`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('Delete user with invalid userId', async () => {
    const response = await request(app)
      .delete(`/user/invalidUser`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Delete user successfully', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

afterAll(() => {
  prisma.$disconnect();
  server.close();
});
