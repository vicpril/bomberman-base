import path from 'path';
import express from 'express';
import config from '../../webpackConfigs/client.config';
import { IndexController } from './controllers/IndexController';
import { webpackMiddlewares } from './middlewares/webpackMiddleware';

const app = express();

app
  .use(webpackMiddlewares(config))
  .use(express.static(path.join(__dirname, '../dist')));

app.get(['/*'], IndexController.index);

export { app };
