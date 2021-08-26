// TODO: Сделать чтобы работало на проде перед деплоем (через переменные окружения)
export const PROXY_YANDEX_API_URL = 'http://localhost:5000/api/v1/yandex-api';
export const BASE_API_URL = 'http://localhost:5000/api/v1';

export const PATHS = {
  auth: {
    signIn: `${PROXY_YANDEX_API_URL}/auth/signin`,
    signUp: `${PROXY_YANDEX_API_URL}/auth/signup`,
    logout: `${PROXY_YANDEX_API_URL}/auth/logout`,
    userInfo: `${PROXY_YANDEX_API_URL}/auth/user`,
  },
  users: {
    updateProfile: `${PROXY_YANDEX_API_URL}/user/profile`,
    changePassword: `${PROXY_YANDEX_API_URL}/user/password`,
    uploadAvatar: `${PROXY_YANDEX_API_URL}/user/profile/avatar`,
    theme: `${BASE_API_URL}/themes/mytheme`,
  },
  leaderboard: {
    addLeader: `${PROXY_YANDEX_API_URL}/leaderboard`,
    getLeaderboard: `${PROXY_YANDEX_API_URL}/leaderboard/all`,
  },
  resources: {
    getUrl: `${PROXY_YANDEX_API_URL}/resources`,
  },
  oauth: {
    getServiceId: `${PROXY_YANDEX_API_URL}/oauth/yandex/service-id`,
    signIn: `${PROXY_YANDEX_API_URL}/oauth/yandex`,
  },
  forum: {
    getTopics: `${BASE_API_URL}/topics`,
    addTopic: `${BASE_API_URL}/topics`,
    deleteTopic: `${BASE_API_URL}/topics`,
    watchTopic: `${BASE_API_URL}/topics/watch`,
    getComments: `${BASE_API_URL}/comments`,
    addComment: `${BASE_API_URL}/comments`,
    deleteComment: `${BASE_API_URL}/comments`,
  },
};
