import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/error/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { plainToInstance } from 'class-transformer';
import {
  ICreateSessionDTO,
  ICreateSessionResponseDTO,
} from './dto/ICreateSessionDTO';
import { IUserRepository } from '../repository/UserRepository.interface';
import { User } from '../entities/User';

@injectable()
class CreateSessionService {
  private readonly jwtSecret: string;

  private readonly jwtExpiresIn: string;

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {
    this.jwtSecret = process.env.JWT_SECRET ?? 'jZkiADNIrB';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '7d';
  }

  async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<ICreateSessionResponseDTO> {
    const user = await this.userRepository.findBy({
      email,
    });

    if (!user) {
      throw new AppError('Verifique se o email e senha estão corretos', 404);
    }

    if (user.blocked) {
      throw new AppError('Seu usuário foi bloqueado por um administrador', 403);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Verifique se o email e senha estão corretos', 404);
    }

    const token = jwt.sign({ id: user.id, role: user.role }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    user.lastLogin = new Date();

    await this.userRepository.update(user);

    return {
      user: plainToInstance(User, user),
      token,
    };
  }
}

export { CreateSessionService };
