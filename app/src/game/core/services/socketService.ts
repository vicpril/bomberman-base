import { SOCKETS_API_URL } from 'api/config';
import { io } from 'socket.io-client';
// import { IS_PROD } from '../../../../webpackConfigs/env';

export const socket = io(SOCKETS_API_URL, {
  // path: IS_PROD ? '/sockets' : '/socket.io',
  withCredentials: true,
});
