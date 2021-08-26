import path from 'path';
import { Configuration } from 'webpack';
import { SERVER_OUT_DIR } from './env';
const nodeExternals = require('webpack-node-externals');

const config: Configuration = {
  entry: './src/game/server-side/index.ts',
  mode: 'production',
  target: 'node',
  output: {
    path: SERVER_OUT_DIR,
    libraryTarget: 'commonjs2',
    filename: 'sockets.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      game: path.resolve(__dirname, '..', 'src/game/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  watch: false,
};

export default config;

