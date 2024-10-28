import { injectable, inject } from "tsyringe";
import { User } from "../entities/User";
import { ICreateUserDTO } from "./dto/ICreateUserDTO";
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { AppError } from "@shared/error/AppError";

@injectable()
class CreateUser {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({...data}: ICreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findBy({
      email: data.email
    });

    if(userExists) {
      throw new AppError('User already exists', 400);
    }

    const user = await this.userRepository.create(data);

    return user;
  }
}

export { CreateUser };
