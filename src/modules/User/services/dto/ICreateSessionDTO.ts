import { User } from '@modules/User/entities/User';

interface ICreateSessionDTO {
  email: string;
  password: string;
}

interface ICreateSessionResponseDTO {
  user: User;
  token: string;
}

export { ICreateSessionDTO, ICreateSessionResponseDTO };
