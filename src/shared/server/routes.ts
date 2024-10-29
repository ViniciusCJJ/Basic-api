import { userRouter } from '@modules/User/routes/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);

export { router };
