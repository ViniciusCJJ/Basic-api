import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface IAuthenticatedRequest<P = { id: string }> extends Request<P> {
  user: {
    id: string;
    role: UserRole;
  };
}
