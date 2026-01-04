import { UserRole } from '@prisma/client';

declare global {
  namespace Express {
    export interface IRequest {
      user: {
        id: string;
        role: UserRole;
      };
    }
  }
}
