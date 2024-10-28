import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { container } from "tsyringe";
import { createUserSchema } from '@modules/User/routes/validators/user.validation';
import { validate } from "@shared/middleware/validate";

const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post('/', validate(createUserSchema),  userController.create);

export { userRouter };


