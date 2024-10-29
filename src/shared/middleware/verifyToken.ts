import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const secret = process.env.JWT_SECRET
    ? (process.env.JWT_SECRET as string)
    : 'jZkiADNIrB';

  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'JWT não encontrado', status: 401 });
  }

  const token = req.headers.authorization.split(' ')[1];

  const decoded = jwt.verify(token as string, secret);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido', status: 401 });
  }

  Object.assign(req, { user: decoded });

  return next();
};
