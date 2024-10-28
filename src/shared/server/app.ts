import express, { NextFunction, Request, Response, json } from 'express';
import { router } from './routes';
import { globalErrorHandler } from '@shared/middleware/globalErrorHandler';
import '@shared/container';

const app = express();

app.use(json());

app.use(router);

app.use(globalErrorHandler);

export { app };
