import { RedisProvider } from '@shared/providers/RedisProvider/implementation/RedisProvider';
import { container } from 'tsyringe';

export async function invalidateIndexUsersCache(): Promise<void> {
  const baseKey = 'IndexUsersCache';

  const redisProvider = container.resolve(RedisProvider);

  const cachedKey = await redisProvider.get(baseKey);

  if (cachedKey) {
    const keys = cachedKey.split(';');

    await Promise.all(keys.map(key => redisProvider.delete(key)));
  }
}
