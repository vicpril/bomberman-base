import { Router } from 'express';
import { commentsRoutes } from './commentsRoutes';
import { topicsRoutes } from './topicsRoutes';
import { usersRoutes } from './usersRoutes';

export const apiRoutes = (router: Router) => {
  const apiRouter: Router = Router();

  topicsRoutes(apiRouter);
  commentsRoutes(apiRouter);
  usersRoutes(apiRouter);

  router.use('/api/v1', apiRouter);

  router.all(['/api/*'], (_, resp) => {
    resp.status(404).send('API no found');
  });
};
