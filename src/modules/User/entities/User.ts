import { $Enums, User as IUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

class User implements IUser {
  name!: string;

  id!: string;

  email!: string;

  role!: $Enums.UserRole;

  @Exclude()
  password!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export { User };
