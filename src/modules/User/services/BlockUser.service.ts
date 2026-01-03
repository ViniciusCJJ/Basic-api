import { inject, injectable } from 'tsyringe';
import { UserRole } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/User';
import { IBlockUserDTO } from './dto/IBlockUserDTO';
import { IUserRepository } from '../repository/UserRepository.interface';
import { IRedisProviderDTO } from '@shared/providers/RedisProvider/dto/RedisProviderDTO';

@injectable()
class BlockUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider') private redisProvider: IRedisProviderDTO,
  ) {}

  async execute({ id, request_id, blocked }: IBlockUserDTO): Promise<User> {
    const requestUser = await this.userRepository.findBy({
      id: request_id,
    });

    if (!requestUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const user = await this.userRepository.findBy({
      id,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.role === UserRole.Admin) {
      throw new AppError(
        'Não é possível bloquear um usuário administrador',
        403,
      );
    }

    user.blocked = blocked;

    await this.userRepository.update(user);

    const blockedIds = await this.userRepository.listBlockedIds();

    await this.redisProvider.save({
      key: 'blocked_users',
      value: JSON.stringify(blockedIds),
      ttl: 60 * 20,
      mode: 'EX',
    });

    return plainToInstance(User, user);
  }
}

export { BlockUserService };
