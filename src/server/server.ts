import path from 'path';
import express from 'express';
import { IS_DEV } from '../../webpackConfigs/env';
import config from '../../webpackConfigs/client.config';
import { IndexController } from './controllers/IndexController';
import { webpackMiddlewares } from './middlewares/webpackMiddleware';

const app = express();

if (IS_DEV) {
  app.use(webpackMiddlewares(config));
}
app.use(express.static(path.join(__dirname, '../dist')));

app.get(['/*'], IndexController.index);

export { app };
