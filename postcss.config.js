module.exports = {
  plugins: [
    'postcss-nested',
    [
      'postcss-preset-env',
      {
        browsers: 'last 2 versions',
        stage: 0,
      },
    ],
  ],
};
