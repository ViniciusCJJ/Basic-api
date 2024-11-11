import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import '@shared/database';
import 'src/shared/providers/RedisProvider/index';
import { app } from '@shared/server/app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running on port ${PORT} , URL: ${
      process.env.BASE_URL || 'http://localhost:3333'
    }`,
  );
});
