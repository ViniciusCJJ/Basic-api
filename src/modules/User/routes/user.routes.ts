import { Router } from 'express';
import { container } from 'tsyringe';
import {
  createUserSchema,
  loginSchema,
  updateUserSchema,
} from '@modules/User/routes/validators/user.validation';
import { validate } from '@shared/middleware/validate';
import { verifyToken } from '@shared/middleware/verifyToken';
import verifyAuth from '@shared/middleware/verifyAuth';
import { UserRole } from '@prisma/client';
import { UserController } from '../controller/user.controller';

const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post('/', validate(createUserSchema), userController.create);

userRouter.post('/login', validate(loginSchema), userController.createSession);

userRouter.use(verifyToken);

userRouter.put('/:id', validate(updateUserSchema), userController.update);

export { userRouter };
