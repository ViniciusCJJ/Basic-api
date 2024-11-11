import { UserRole } from '@prisma/client';
import { AppError } from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';
import { IUserRepository } from '../repository/UserRepository.interface';
import { User } from '../entities/User';

@injectable()
class IndexUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(
    id: string,
    page: number,
    limit: number,
    filters: Partial<User>,
  ): Promise<User[]> {
    const requestUser = await this.userRepository.findBy({
      id,
    });

    console.log(requestUser);

    if (!requestUser || requestUser.role !== UserRole.Admin) {
      throw new AppError('Falha ao listar usuários', 401);
    }

    const users = await this.userRepository.listBy({
      ...filters,
      page,
      limit,
    });

    return users;
  }
}

export { IndexUserService };
