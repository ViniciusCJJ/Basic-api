import { prisma } from '@shared/database';
import { User } from '../entities/User';
import { ICreateUserDTO } from './dto/UserRepositoryDTO';
import { IUserRepository } from './UserRepository.interface';

class UserRepository implements IUserRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return user;
  }

  async findBy(filters: Partial<User>): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        ...filters,
      },
    });

    return user;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    return updatedUser;
  }

  async remove(user: User): Promise<void> {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async listBy(
    filters: Partial<User> & { page?: number; limit?: number },
  ): Promise<any> {
    const {
      page = 1,
      limit = Number(process.env.PAGINATION_LIMIT) ?? 10,
      ...restFilters
    } = filters;

    const users = await prisma.user.findMany({
      where: {
        ...restFilters,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.user.count({
      where: {
        ...restFilters,
      },
    });

    return {
      data: users,
      page,
      limit,
      total,
    };
  }
}

export { UserRepository };
