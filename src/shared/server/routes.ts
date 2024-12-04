import { userRouter } from '@modules/User/routes/user.routes';
import { Request, Response, Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '@config/swagger.json';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send(
    `${process.env.API_NAME || 'BasicBoilerplate'} ${
      process.env.API_VERSION || 'v1.0.0'
    }`,
  );
});

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerOptions));

router.use('/user', userRouter);

export { router };
