import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { AppError } from '@shared/error/AppError';
import { plainToInstance } from 'class-transformer';
import { UserRole } from '@prisma/client';
import { User } from '../entities/User';
import { IUpdateUserDTO } from './dto/IUpdateUserDTO';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    request_id,
    role,
    ...data
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findBy({
      id,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.id !== request_id && role !== UserRole.Admin) {
      throw new AppError('Usuário não encontrado', 404);
    }

    Object.assign(user, data);

    const updatedUser = await this.userRepository.update(user);

    return plainToInstance(User, updatedUser);
  }
}

export { UpdateUserService };
