import { Router } from 'express';
import { UsersController } from 'server/controllers/UsersController';

export const usersRoutes = (router: Router) => {
  const usersRouter: Router = Router();

  // чисто для теста
  usersRouter.get('/', UsersController.getAll);

  router.use('/users', usersRouter);
};
