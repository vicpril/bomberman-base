import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { IS_DEV } from '../../webpackConfigs/env';
import config from '../../webpackConfigs/client.config';
import { webpackMiddlewares } from './middlewares/webpackMiddleware';
import { sequelize } from './models';
import { ThemesController } from './controllers/ThemesController';
import { ThemesService } from './services/ThemesService';
import { UsersController } from './controllers/UsersController';
import { UsersService } from './services/UsersService';
import router from './routes';

const port = 5000;

export const startServer = async () => {
  // Форс дропает все таблицы каждый раз при запуске сервера, пока мы вносим много изменений в базы это удобно
  await sequelize.sync({ force: true });

  // Создаем юзера после подключения к базе, чтобы нам было что отдать с ручки
  UsersService.create({
    name: 'Steve',
  });

  ThemesService.create({
    name: 'light',
    description: 'light theme description',
  });
  ThemesService.create({
    name: 'dark',
    description: 'dark theme profound description',
  });

  const app = express();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(cookieParser());

  if (IS_DEV) {
    app.use(webpackMiddlewares(config));
  }
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('/api/users', UsersController.getAll);
  app.get('/api/themes', ThemesController.getAll);
  app.get('/api/themes/:themeId', ThemesController.findOne);
  app.post('/api/themes/create', ThemesController.create);

  app.use(router);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost:', port);
  });
};
