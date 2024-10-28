import { container } from "tsyringe";
import { CreateUser } from "../services/CreateUser.service";
import { Request, Response } from "express";

class UserController {

  async create(req: Request, res: Response): Promise<any> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUser);

    const user = await createUser.execute({ name, email, password });

    return res.status(201).json(user);
  }
}

export { UserController };
