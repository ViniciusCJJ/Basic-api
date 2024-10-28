import { User } from "../entities/User";
import { ICreateUserDTO } from "./dto/UserRepositoryDTO";
import { IUserRepository } from "./UserRepository.interface";
import { prisma } from "@shared/database";

class UserRepository implements IUserRepository{
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data
      },
    });

    return user;
  }
  async findBy(filters: Partial<User>): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        ...filters
      }
    });

    return user;
  }
  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        ...user
      }
    });

    return updatedUser;
  }
  async remove(user: User): Promise<void> {
    await prisma.user.delete({
      where: {
        id: user.id
      }
    });
  }
}

export { UserRepository };
