import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { IAuthenticatedRequest } from '@shared/types/AuthenticatedRequest';
import { CreateUserService } from '../services/CreateUser.service';
import { CreateSessionService } from '../services/CreateSession.service';
import { UpdateUserService } from '../services/UpdateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { IndexUserService } from '../services/IndexUser.service';
import { GetUserService } from '../services/GetUser.service';
import { ChangePasswordService } from '../services/ChangePassword.service';
import { ForgotPasswordService } from '../services/ForgotPassword.service';
import { ResetPasswordService } from '../services/ResetPassword.service';
import { DestroySessionService } from '../services/DestroySession.service';
import { BlockUserService } from '../services/BlockUser.service';

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    res.status(201).json(user);
  }

  async update(req: IAuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    const { id: request_id, role } = req.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ name, id, request_id, role });

    res.status(201).json(user);
  }

  async createSession(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const response = await createSession.execute({ email, password });

    res.status(200).json(response);
  }

  async destroySession(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];

    const destroySession = container.resolve(DestroySessionService);

    const response = await destroySession.execute({
      token,
    });

    res.status(200).json(response);
  }

  async get(req: IAuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { id: request_id } = req.user;

    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute({ id, request_id });

    res.status(200).json(user);
  }

  async delete(req: IAuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { id: request_id } = req.user;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id, request_id });

    res.status(204).send();
  }

  async index(req: IAuthenticatedRequest, res: Response): Promise<void> {
    const { page, limit, ...filters } = req.query;
    const { id } = req.user;

    const indexUser = container.resolve(IndexUserService);

    const user = await indexUser.execute(
      id,
      Number(page),
      Number(limit),
      filters,
    );

    res.status(200).json(user);
  }

  async block(req: IAuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const { blocked } = req.body;
    const { id: request_id, role } = req.user;

    const blockUser = container.resolve(BlockUserService);

    const user = await blockUser.execute({
      id,
      request_id,
      role,
      blocked,
    });

    res.status(201).json(user);
  }

  async changePassword(
    req: IAuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const { id: request_id } = req.user;

    const changePassword = container.resolve(ChangePasswordService);

    await changePassword.execute({
      request_id,
      user_id: id,
      oldPassword,
      newPassword,
    });

    res.status(204).send();
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    const forgotPassword = container.resolve(ForgotPasswordService);

    await forgotPassword.execute(email);

    res.status(204).send();
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { password } = req.body;
    const { token } = req.params as { token: string };

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    res.status(204).send();
  }
}

export { UserController };
