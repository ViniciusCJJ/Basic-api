import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUser.service';
import { CreateSessionService } from '../services/CreateSession.service';
import { UpdateUserService } from '../services/UpdateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { IndexUserService } from '../services/IndexUser.service';
import { GetUserService } from '../services/GetUser.service';

class UserController {
  async create(req: Request, res: Response): Promise<any> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { name } = req.body;
    const { id: request_id, role } = req.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ name, id, request_id, role });

    return res.status(201).json(user);
  }

  async createSession(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const response = await createSession.execute({ email, password });

    return res.status(201).json(response);
  }

  async get(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { id: request_id } = req.user;

    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute({ id, request_id });

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { id: request_id } = req.user;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id, request_id });

    return res.status(204).send();
  }

  async index(req: Request, res: Response): Promise<any> {
    const { page, limit, ...filters } = req.query;
    const { id } = req.user;

    const indexUser = container.resolve(IndexUserService);

    const user = await indexUser.execute(id, page, limit, filters);

    return res.status(200).json(user);
  }
}

export { UserController };
