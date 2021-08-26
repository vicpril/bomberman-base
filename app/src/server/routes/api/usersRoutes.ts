import { Router } from 'express';
import { UsersController } from 'server/controllers/UsersController';

export const usersRoutes = (router: Router) => {
  const usersRouter: Router = Router();

  usersRouter.get('/', UsersController.getAll);

  router.use('/users', usersRouter);
};
