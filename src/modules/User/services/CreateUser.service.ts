import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { AppError } from '@shared/error/AppError';
import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/User';
import { ICreateUserDTO } from './dto/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ ...data }: ICreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findBy({
      email: data.email,
    });

    if (userExists) {
      throw new AppError('Este email já está cadastrado', 400);
    }

    const passwordHash = await bcrypt.hash(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return plainToInstance(User, user);
  }
}

export { CreateUserService };
