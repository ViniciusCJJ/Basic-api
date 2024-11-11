import { inject, injectable } from 'tsyringe';
import { UserRole } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import { IUserRepository } from '../repository/UserRepository.interface';
import { IDeleteUserDTO } from './dto/IDeleteUserDTO';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, request_id }: IDeleteUserDTO): Promise<void> {
    const requestUser = await this.userRepository.findBy({
      id: request_id,
    });

    if (
      !requestUser ||
      (requestUser.id !== request_id && requestUser.role !== UserRole.Admin)
    ) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const user = await this.userRepository.findBy({
      id,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    await this.userRepository.remove(user);
  }
}

export { DeleteUserService };
