import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { IRedisProviderDTO } from '@shared/providers/RedisProvider/dto/RedisProviderDTO';

@injectable()
class SyncBlockedUsersJob {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('RedisProvider') private redisProvider: IRedisProviderDTO,
  ) {}

  async run(): Promise<void> {
    const blockedIds = await this.userRepository.listBlockedIds();

    await this.redisProvider.save({
      key: 'blocked_users',
      value: JSON.stringify(blockedIds),
      ttl: 60 * 20,
      mode: 'EX',
    });
  }
}

export { SyncBlockedUsersJob };
