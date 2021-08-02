import { IS_DEV } from '../../../webpackConfigs/env';

const BASE_URL = IS_DEV
  ? 'http://localhost:5000'
  // Временный фикс. Чтобы продакшен работал хотя бы с локалхоста
  : 'http://localhost:5000';

// TODO прописать redirect_url для продакшена, когда он будет добавлен в приложение на Yandex OAuth
// : 'https://gamedev-ypraktikum.herokuapp.com';

export const REDIRECT_URI_OAUTH = `${BASE_URL}/`;

export const REDIRECT_URI_SIGNIN = `${BASE_URL}/`;
