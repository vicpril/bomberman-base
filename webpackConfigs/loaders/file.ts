const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/;

export default {
  client: {
    test: fileRegex,
    type: 'asset/resource',
  },
  server: {
    test: fileRegex,
    type: 'asset/resource',
  },
};
