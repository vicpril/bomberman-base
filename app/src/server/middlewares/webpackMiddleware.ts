import { RequestHandler } from 'express';
import webpack, { Configuration } from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export function webpackMiddlewares(conf: Configuration): RequestHandler[] {
  const compiler = webpack({ ...conf, mode: 'development' });

  return [
    devMiddleware(compiler, {
      publicPath: '/',
    }),
    hotMiddleware(compiler, { path: '/__webpack_hmr' }),
  ];
}
