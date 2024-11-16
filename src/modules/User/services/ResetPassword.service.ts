import { inject, injectable } from 'tsyringe';
import { IRedisProviderDTO } from '@shared/providers/RedisProvider/dto/RedisProviderDTO';
import { AppError } from '@shared/error/AppError';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../repository/UserRepository.interface';
import { IResetPasswordDTO } from './dto/IResetPasswordDTO';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RedisProvider')
    private redisProvider: IRedisProviderDTO,
  ) {}

  async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const userId = await this.redisProvider.get(token);

    if (!userId) {
      throw new AppError(
        'O tempo para redefinir a senha expirou, solicite novamente.',
        400,
      );
    }

    const user = await this.userRepository.findBy({
      id: userId,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const passwordHash = await bcrypt.hash(password, 8);

    user.password = passwordHash;

    await this.userRepository.update(user);
  }
}

export { ResetPasswordService };
