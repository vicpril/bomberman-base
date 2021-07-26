import path from 'path';
import express, { RequestHandler } from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack, { Configuration } from 'webpack';
import { IS_DEV } from '../../webpackConfigs/env';
import config from '../../webpackConfigs/client.config';
import { serverRenderMiddleware } from './serverRenderMiddleware';

function getWebpackMiddlewares(conf: Configuration): RequestHandler[] {
  if (!IS_DEV) {
    return [];
  }

  const compiler = webpack({ ...conf, mode: 'development' });

  return [
    devMiddleware(compiler, {
      publicPath: '/',
    }),
    hotMiddleware(compiler, { path: '/__webpack_hmr' }),
  ];
}

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get(['/*'], getWebpackMiddlewares(config), serverRenderMiddleware);

export { app };
