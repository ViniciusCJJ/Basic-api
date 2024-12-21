import express, { json } from 'express';
import logger from '@shared/utils/logger';
import { globalErrorHandler } from '@shared/middleware/globalErrorHandler';
import path from 'path';
import { router } from './routes';
import '../providers/RedisProvider';
import '../providers/MailProvider';
import '../providers/StorageProvider';
import '@shared/container';

const app = express();

app.use(json());

if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function _f(data) {
      const logObject = {
        method: req.method,
        url: req.baseUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        status: res.statusCode,
        response: data,
      };
      logger.info(JSON.stringify(logObject));
      return originalSend.call(this, data);
    };
    next();
  });
}

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', '..', 'uploads')),
);

app.all('*', (_req, res) => {
  res.status(404).json({ message: 'Rota não encontrada', statusCode: 404 });
});

app.use(globalErrorHandler);

export { app };
