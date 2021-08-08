export default {
  client: {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        compiler: 'ttypescript',
      },
    },
    exclude: /node_modules/,
  },
  server: {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        compiler: 'ttypescript',
      },
    },
    exclude: /node_modules/,
  },
};
