import { Response, NextFunction, RequestHandler } from 'express';
import { IAuthenticatedRequest } from '@shared/types/AuthenticatedRequest';

export function authenticatedHandler<P = { id: string }>(
  handler: (req: IAuthenticatedRequest<P>, res: Response) => Promise<void>,
): RequestHandler<P> {
  return (req, res, next) => {
    return handler(req as IAuthenticatedRequest<P>, res).catch(next);
  };
}
