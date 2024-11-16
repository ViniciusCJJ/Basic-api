import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/error/AppError';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../repository/UserRepository.interface';
import { IChangePasswordDTO } from './dto/IChangePasswordDTO';

@injectable()
class ChangePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    request_id,
    user_id,
    oldPassword,
    newPassword,
  }: IChangePasswordDTO): Promise<void> {
    const requestUser = await this.userRepository.findBy({
      id: request_id,
    });

    if (
      !requestUser ||
      (requestUser.id !== user_id && requestUser.role !== UserRole.Admin)
    ) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const user = await this.userRepository.findBy({
      id: user_id,
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new AppError('A senha enviada não corresponde a senha atual', 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 8);

    user.password = passwordHash;

    await this.userRepository.update(user);
  }
}

export { ChangePasswordService };
