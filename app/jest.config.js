// eslint-disable-next-line no-undef
module.exports = {
  roots: [
    'src',
  ],
  modulePaths: [
    'src',
  ],
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.tsx?$': 'ts-jest',
    '\\.jsx?$': 'babel-jest', // if you have jsx tests too
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/jest-file-transformer.js',
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
