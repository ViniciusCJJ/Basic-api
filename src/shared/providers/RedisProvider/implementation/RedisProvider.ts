import { Redis } from 'ioredis';
import { RedisConfig } from '@config/RedisConfig';
import { ISetData } from '../dto/RedisProviderDTO';

class RedisProvider {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(RedisConfig);

    this.redisClient.on('error', error => {
      console.error('Redis error:', error);

      process.exit(1);
    });
  }

  async save({ key, value, ttl = -1, mode = 'EX' }: ISetData): Promise<void> {
    await this.redisClient.set(key, value, mode, ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}

export { RedisProvider };
