import { UserRole } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';
import { RedisProvider } from '@shared/providers/RedisProvider/implementation/RedisProvider';
import {
  IndexResponse,
  IUserRepository,
} from '../repository/UserRepository.interface';
import { User } from '../entities/User';

@injectable()
class IndexUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: RedisProvider,
  ) {}

  public async execute(
    id: string,
    page: number,
    limit: number,
    filters: Partial<User>,
  ): Promise<IndexResponse<User>> {
    const requestUser = await this.userRepository.findBy({
      id,
    });

    const baseKey = 'IndexUsersCache';

    const cacheKey = `users:${JSON.stringify(filters)}:${page}:${limit}`;

    const cachedUsers = await this.redisProvider.get(cacheKey);

    const baseCachedKey = await this.redisProvider.get(baseKey);

    if (cachedUsers) {
      return JSON.parse(cachedUsers);
    }

    if (!requestUser || requestUser.role !== UserRole.Admin) {
      throw new AppError('Falha ao listar usuários', 401);
    }

    const result = await this.userRepository.listBy({
      page,
      limit,
      filters,
    });

    await this.redisProvider.save({
      key: cacheKey,
      value: JSON.stringify(result),
      ttl: 60 * 60,
    });

    if (!baseCachedKey) {
      await this.redisProvider.save({
        key: baseKey,
        value: cacheKey,
        ttl: 60 * 60,
      });
    } else {
      const containsKey = baseCachedKey
        .split(';')
        .find(key => key === cacheKey);

      if (!containsKey) {
        await this.redisProvider.save({
          key: baseKey,
          value: `${baseCachedKey};${cacheKey}`,
          ttl: 60 * 60,
        });
      }
    }

    result.data = result.data.map(user => plainToInstance(User, user));

    return result;
  }
}

export { IndexUserService };
