import { prisma } from '@shared/database';
import { invalidateIndexUsersCache } from '@shared/utils/invalidateIndexUsersCache';
import { User } from '../entities/User';
import { ICreateUserDTO } from './dto/UserRepositoryDTO';
import {
  IndexRequest,
  IndexResponse,
  IUserRepository,
} from './UserRepository.interface';

class UserRepository implements IUserRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    await invalidateIndexUsersCache();

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
    await invalidateIndexUsersCache();

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
    await invalidateIndexUsersCache();

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async listBy({
    page = 1,
    limit = Number(process.env.PAGINATION_LIMIT) ?? 10,
    filters,
  }: IndexRequest<User>): Promise<IndexResponse<User>> {
    const users = await prisma.user.findMany({
      where: {
        ...filters,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.user.count({
      where: {
        ...filters,
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
