import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import '@shared/database';
import '@shared/providers/RedisProvider/index';
import '@shared/providers/MailProvider/index';
import { app } from '@shared/server/app';
import { blockedUsersJob } from '@shared/jobs';

const PORT = process.env.PORT || 3333;

blockedUsersJob.start();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT} , URL: ${
        process.env.BASE_URL || 'http://localhost:3333'
      }`,
    );
  });
}
