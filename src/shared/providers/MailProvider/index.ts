import { container } from 'tsyringe';
import { MailProvider } from './implementation/MailProvider';
import { IMailProviderDTO } from './dto/MailProviderDTO';

container.registerSingleton<IMailProviderDTO>('MailProvider', MailProvider);
