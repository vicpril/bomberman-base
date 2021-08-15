import { Router } from 'express';
import { YandexAPiController } from 'server/controllers/YandexAPiController';

export const yandexApiRoutes = (router: Router) => {
  const yandexApiRouter: Router = Router();

  yandexApiRouter.get('/*', YandexAPiController.redirectRequest);
  yandexApiRouter.post('/*', YandexAPiController.redirectRequest);
  yandexApiRouter.put('/*', YandexAPiController.redirectRequest);

  router.use('/yandex-api', yandexApiRouter);
};
