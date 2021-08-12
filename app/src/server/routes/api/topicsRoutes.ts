import { Router } from 'express';
import { TopicsController } from 'server/controllers/TopicsController';

export const topicsRoutes = (router: Router) => {
  const topicsRouter: Router = Router();

  topicsRouter.get('/', TopicsController.getAll);
  topicsRouter.get('/:id', TopicsController.get);
  topicsRouter.post('/', TopicsController.create);
  topicsRouter.delete('/:id', TopicsController.delete);
  topicsRouter.get('/watch/:id', TopicsController.watch);

  router.use('/topics', topicsRouter);
};
