import { Router } from 'express';
import { container } from 'tsyringe';
import {
  blockUserSchema,
  changePasswordSchema,
  createUserSchema,
  deleteUserSchema,
  forgotPasswordSchema,
  getUserSchema,
  indexUserSchema,
  loginSchema,
  logoutSchema,
  resetPasswordSchema,
  updateUserSchema,
} from '@modules/User/routes/validators/user.validation';
import { validate } from '@shared/middleware/validate';
import { verifyToken } from '@shared/middleware/verifyToken';
import verifyAuth from '@shared/middleware/verifyAuth';
import { UserRole } from '@prisma/client';
import { authenticatedHandler } from '@shared/utils/authenticatedHandler';
import { UserController } from '../controller/user.controller';

const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post('/', validate(createUserSchema), userController.create);

userRouter.post('/login', validate(loginSchema), userController.createSession);

userRouter.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  userController.forgotPassword,
);

userRouter.post(
  '/reset-password/:token',
  validate(resetPasswordSchema),
  userController.resetPassword,
);

userRouter.use(verifyToken);

userRouter.delete(
  '/logout',
  validate(logoutSchema),
  userController.destroySession,
);

userRouter.put(
  '/:id',
  validate(updateUserSchema),
  authenticatedHandler(userController.update),
);

userRouter.put(
  '/block/:id',
  verifyAuth([UserRole.Admin]),
  validate(blockUserSchema),
  authenticatedHandler(userController.block),
);

userRouter.get(
  '/:id',
  validate(getUserSchema),
  authenticatedHandler(userController.get),
);

userRouter.delete(
  '/:id',
  validate(deleteUserSchema),
  authenticatedHandler(userController.delete),
);

userRouter.get(
  '/',
  verifyAuth([UserRole.Admin]),
  validate(indexUserSchema),
  authenticatedHandler(userController.index),
);

userRouter.post(
  '/change-password/:id',
  validate(changePasswordSchema),
  authenticatedHandler(userController.changePassword),
);

export { userRouter };
