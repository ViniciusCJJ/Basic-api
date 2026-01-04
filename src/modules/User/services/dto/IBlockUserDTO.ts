import { UserRole } from '@prisma/client';

interface IBlockUserDTO {
  id: string;
  request_id: string;
  role: UserRole;
  blocked: boolean;
}

export { IBlockUserDTO };
