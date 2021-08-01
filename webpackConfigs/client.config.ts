import {
  ProvidePlugin, Configuration, Entry, HotModuleReplacementPlugin,
} from 'webpack';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { DIST_DIR, SRC_DIR, IS_DEV } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
  name: 'client',
  target: 'web',
  entry: {
    main: [
      IS_DEV && 'react-hot-loader/patch',
      IS_DEV && 'webpack-hot-middleware/client',
      IS_DEV && 'css-hot-loader/hotModuleReplacement',
      path.join(SRC_DIR, 'index'),
    ].filter(Boolean) as unknown,
  } as Entry,
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: [SRC_DIR, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      jsLoader.client,
      fileLoader.client,
      cssLoader.client,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/backupHtml/offline.html',
      filename: 'offline.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(SRC_DIR, 'locales'), to: 'locales' },
        { from: path.join(SRC_DIR, 'webWorkers/serviceWorker.js'), to: '' },
        { from: path.join(SRC_DIR, 'webWorkers/computationWorker.js'), to: '' }],
    }),
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devtool: 'source-map',
  optimization: {
    minimizer: !IS_DEV ? [
      '...',
      new CssMinimizerPlugin(),
    ] : [],
  },
};

export default config;
