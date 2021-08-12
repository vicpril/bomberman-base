import { Router } from 'express';
import { CommentsController } from 'server/controllers/CommentsController';

export const commentsRoutes = (router: Router) => {
  const commentsRouter: Router = Router();

  commentsRouter.get('/:topicId', CommentsController.getByTopicId);
  commentsRouter.post('/', CommentsController.create);
  commentsRouter.delete('/:id', CommentsController.delete);

  router.use('/comments', commentsRouter);
};
