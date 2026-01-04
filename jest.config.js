module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: [
    // '**/__tests__/**/*.test.js?(x)',
    // '**/?(*.)+(spec|test).js?(x)',
    '**/__tests__/**/*.test.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@error/(.*)$': '<rootDir>/src/shared/errors/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@prisma/client$': '<rootDir>/src/shared/database/generated/prisma/client',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
