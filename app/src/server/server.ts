import path from 'path';
import express from 'express';
import { IS_DEV } from '../../webpackConfigs/env';
import config from '../../webpackConfigs/client.config';
import { IndexController } from './controllers/IndexController';
import { webpackMiddlewares } from './middlewares/webpackMiddleware';
import { getUsers } from './views/users';
import { sequelize } from './models';
import { User } from './models/User';

const port = 5000;

export const startServer = async () => {
  // Форс дропает все таблицы каждый раз при запуске сервера, пока мы вносим много изменений в базы это удобно
  await sequelize.sync({ force: true });

  // Создаем юзера после подключения к базе, чтобы нам было что отдать с ручки
  User.create({
    name: 'Steve',
  });

  const app = express();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  if (IS_DEV) {
    app.use(webpackMiddlewares(config));
  }
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('/api/users', getUsers);

  app.get(['/*'], IndexController.index);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost:', port);
  });
};
