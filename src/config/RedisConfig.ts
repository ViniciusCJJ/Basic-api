export interface IRedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export const RedisConfig: IRedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB) || 0,
};
