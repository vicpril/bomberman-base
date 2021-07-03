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
