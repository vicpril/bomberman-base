import clientConfig from './webpackConfigs/client.config';
import serverConfig from './webpackConfigs/server.config';
import { IS_DEV } from './webpackConfigs/env';

const configs = [serverConfig];
if (!IS_DEV) {
  configs.push(clientConfig);
}

export default configs;
