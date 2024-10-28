import { userRouter } from '@modules/User/routes/user.routes';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.use('/user',userRouter);

export { router };
