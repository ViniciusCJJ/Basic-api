/* eslint-disable prettier/prettier */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

import { AppError } from '../error/AppError';

export async function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response<any>> {
  const ip = request.headers['x-forwarded-for'] || request.ip;
  if (err instanceof AppError) {
    // logger.error(
    //   `${err.statusCode} - ${err.message} - ${request.originalUrl} - ${
    //     request.method
    //   } - ${ip} - body: ${JSON.stringify(
    //     request.body,
    //   )} - params: ${JSON.stringify(request.params)} - query: ${JSON.stringify(
    //     request.query,
    //   )} - user: ${'teset'} - date: ${new Date()}`,
    // );

    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // logger.error(
  //   `${500} - ${err.message} - ${request.originalUrl} - ${request.method} - ${
  //     ip
  //   } - body: ${JSON.stringify(request.body)} - params: ${JSON.stringify(
  //     request.params,
  //   )} - query: ${JSON.stringify(request.query)} - user: ${JSON.stringify(
  //     request.user,
  //   )} - date: ${new Date()}`,
  // );

  return response.status(500).json({
    status: 'error',
    message: 'Server error',
  });
}
