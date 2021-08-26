import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import { IS_DEV } from '../../webpackConfigs/env';
import config from '../../webpackConfigs/client.config';
import { webpackMiddlewares } from './middlewares/webpackMiddleware';
import { sequelize } from './models';
import { ThemesService } from './services/ThemesService';
import { UsersService } from './services/UsersService';
import router from './routes';

const port = 5000;

const app = express();

export const startServer = async () => {
  // Форс дропает все таблицы каждый раз при запуске сервера, пока мы вносим много изменений в базы это удобно
  await sequelize.sync({ force: true });

  // Создаем юзера после подключения к базе, чтобы нам было что отдать с ручки
  UsersService.create({
    id: 1,
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

  app.use(router);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost:', port);
  });
};
