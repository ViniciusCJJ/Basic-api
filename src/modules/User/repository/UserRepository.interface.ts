import { User } from '../entities/User';
import { ICreateUserDTO } from './dto/UserRepositoryDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findBy(filters: Partial<User>): Promise<User | null>;
  // listBy(): Promise<User[]>;
  update(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}

export { IUserRepository };
