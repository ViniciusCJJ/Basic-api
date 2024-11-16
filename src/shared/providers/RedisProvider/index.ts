import { container } from 'tsyringe';
import { RedisProvider } from './implementation/RedisProvider';
import { IRedisProviderDTO } from './dto/RedisProviderDTO';

container.registerSingleton<IRedisProviderDTO>('RedisProvider', RedisProvider);
