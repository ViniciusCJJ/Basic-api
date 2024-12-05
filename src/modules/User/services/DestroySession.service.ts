import { inject, injectable } from 'tsyringe';
import { IRedisProviderDTO } from '@shared/providers/RedisProvider/dto/RedisProviderDTO';
import { IDestroySessionDTO } from './dto/IDestroySessionDTO';

@injectable()
class DestroySessionService {
  constructor(
    @inject('RedisProvider')
    private redisProvider: IRedisProviderDTO,
  ) {}

  async execute({ token }: IDestroySessionDTO): Promise<void> {
    const tokenExists = await this.redisProvider.get(token as string);

    if (token && !tokenExists) {
      await this.redisProvider.save({
        key: token,
        value: 'logged_out',
        ttl: 60 * 60 * 24 * 7, // 7 days
        mode: 'EX',
      });
    }
  }
}

export { DestroySessionService };
