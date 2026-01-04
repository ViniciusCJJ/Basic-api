import { AppError } from '@shared/error/AppError';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

interface IZodError {
  name: string;
  errors: Array<{ message: string }>;
}

export async function globalErrorHandler(
  error: Error | AppError | IZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Promise<Response> {
  if ((error as IZodError)?.name === 'ZodError') {
    return res.status(400).json({
      message: `${(error as ZodError)?.errors[0]?.message}`,
      statusCode: 400,
    });
  }

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, statusCode: error.statusCode });
  }

  console.error(error);

  return res
    .status(500)
    .json({ message: 'Internal server error', statusCode: 500 });
}
