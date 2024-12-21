import { container } from 'tsyringe';
import { StorageProvider } from './implementation/StorageProvider';
import { IStorageProviderDTO } from './dto/StorageProviderDTO';

container.registerSingleton<IStorageProviderDTO>(
  'StorageProvider',
  StorageProvider,
);
