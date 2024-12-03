import { inject, injectable } from 'tsyringe';
import { UserRole } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/User';
import { IGetUserDTO } from './dto/IGetUserDTO';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class GetUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ id, request_id }: IGetUserDTO): Promise<User> {
    const requestUser = await this.userRepository.findBy({
      id: request_id,
    });

    if (!requestUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (requestUser.role !== UserRole.Admin && requestUser.id !== id) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const user = await this.userRepository.findBy({
      id,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return plainToInstance(User, user);
  }
}

export { GetUserService };
