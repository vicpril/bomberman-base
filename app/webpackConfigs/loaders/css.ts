import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetUse } from 'webpack';
import { IS_DEV } from '../env';

export default {
  client: {
    test: /\.css$/,
    use: [
      IS_DEV && 'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ].filter(Boolean) as RuleSetUse,
  },
  server: {
    test: /\.css$/,
    loader: 'null-loader',
  },
};
