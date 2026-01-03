import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../database/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'error',
    },
  ],
  adapter,
});

console.log('Prisma client initialized.');

export { prisma };
