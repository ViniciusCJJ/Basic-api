import { AppError } from '@shared/error/AppError';
import { RedisProvider } from '@shared/providers/RedisProvider/implementation/RedisProvider';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { container } from 'tsyringe';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const secret = process.env.JWT_SECRET
    ? (process.env.JWT_SECRET as string)
    : 'jZkiADNIrB';

  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'JWT não encontrado', status: 401 });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token as string, secret) as JwtPayload & {
      id?: string;
      role?: string;
    };

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Token inválido', status: 401 });
    }

    const redisProvider = container.resolve(RedisProvider);

    const tokenExists = await redisProvider.get(token as string);

    if (tokenExists) {
      throw new AppError('Token Inválido', 401);
    }

    const blockedList = await redisProvider.get('blocked_users');

    if (blockedList) {
      const blockedIds = JSON.parse(blockedList) as string[];
      if (blockedIds.includes(decoded.id!)) {
        return res.status(401).json({ message: 'Token inválido', status: 401 });
      }
    }

    Object.assign(req, { user: decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', status: 401 });
  }

  return next();
};
