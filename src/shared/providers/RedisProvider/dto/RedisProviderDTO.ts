interface IRedisProviderDTO {
  save({ key, value, mode, ttl }: ISetData): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}

interface ISetData {
  key: string;
  value: string;
  ttl?: number;
  mode?: 'EX';
}

export { IRedisProviderDTO, ISetData };
