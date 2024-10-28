import { User as IUser } from "@prisma/client";

class User implements IUser {
  name!: string;

  id!: string;

  email!: string;

  password!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export { User };
