import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import { IS_DEV } from '../../webpackConfigs/env';
import config from '../../webpackConfigs/client.config';
import { webpackMiddlewares } from './middlewares/webpackMiddleware';
import { ThemesService } from './services/ThemesService';
import router from './routes';
import { User } from './models/User';
import { Topic } from './models/Topic';
import { Comment } from './models/Comment';
import { SiteTheme } from './models/SiteTheme';
import { UserTheme } from './models/UserTheme';

const port = 5000;

const app = express();

export const startServer = async () => {
  // Форс дропает все таблицы каждый раз при запуске сервера, пока мы вносим много изменений в базы это удобно
  // await sequelize.sync({ force: true });

  // Нужно выдержать последовательность создания таблиц, чтобы не было ошибок с ключами
  User.sync();
  Topic.sync();
  Comment.sync();
  SiteTheme.sync();
  UserTheme.sync();

  ThemesService.init();

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
