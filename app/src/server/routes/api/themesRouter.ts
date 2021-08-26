import { Router } from 'express';
import { ThemesController } from 'server/controllers/ThemesController';

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();

  themesRouter.get('/', ThemesController.getAll);
  themesRouter.get('/mytheme', ThemesController.getMyTheme);
  themesRouter.put('/mytheme', ThemesController.setMyTheme);

  router.use('/themes', themesRouter);
};
