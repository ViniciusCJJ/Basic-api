import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['error'],
});

console.log('PrismaClient connected');

