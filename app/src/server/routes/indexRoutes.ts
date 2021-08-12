import { Router } from 'express';
import { IndexController } from 'server/controllers/IndexController';

export const indexRoutes = (router: Router) => {
  const indexRouter: Router = Router();

  indexRouter.get(['/*'], IndexController.index);

  router.use('/', indexRouter);
};
