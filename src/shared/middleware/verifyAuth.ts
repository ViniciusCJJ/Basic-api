import { AppError } from '@shared/error/AppError';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default function verifyAuth(roles: string[]): any {
  return (req: Request, _res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET
      ? (process.env.JWT_SECRET as string)
      : 'jZkiADNIrB';

    if (roles.length) {
      if (!req.headers.authorization) {
        throw new AppError('Usúario não autorizado', 401);
      }
      const token = req.headers.authorization.split(' ')[1];

      try {
        const tokenData = verify(token as string, secret) as JwtPayload;

        if (!tokenData.role || !roles.some(item => tokenData.role === item)) {
          throw new AppError('Usúario não autorizado', 401);
        }
      } catch (error) {
        throw new AppError('Token Inválido', 401);
      }
    }

    return next();
  };
}
