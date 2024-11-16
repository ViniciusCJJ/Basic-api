import { IndexRequest, IndexResponse } from '@shared/types/PaginationTypes';
import { User } from '../entities/User';
import { ICreateUserDTO } from './dto/UserRepositoryDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findBy(filters: Partial<User>): Promise<User | null>;
  listBy(data: IndexRequest<User>): Promise<IndexResponse<User>>;
  update(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}

export { IUserRepository, IndexResponse, IndexRequest };
