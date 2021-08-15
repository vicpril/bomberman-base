// TODO: Сделать чтобы работало на проде перед деплоем (через переменные окружения)
export const API_BASE_URL = 'http://localhost:5000/api/v1/yandex-api';

export const PATHS = {
  auth: {
    signIn: `${API_BASE_URL}/auth/signin`,
    signUp: `${API_BASE_URL}/auth/signup`,
    logout: `${API_BASE_URL}/auth/logout`,
    userInfo: `${API_BASE_URL}/auth/user`,
  },
  users: {
    updateProfile: `${API_BASE_URL}/user/profile`,
    changePassword: `${API_BASE_URL}/user/password`,
    uploadAvatar: `${API_BASE_URL}/user/profile/avatar`,
  },
  leaderboard: {
    addLeader: `${API_BASE_URL}/leaderboard`,
    getLeaderboard: `${API_BASE_URL}/leaderboard/all`,
  },
  resources: {
    getUrl: `${API_BASE_URL}/resources`,
  },
  oauth: {
    getServiceId: `${API_BASE_URL}/oauth/yandex/service-id`,
    signIn: `${API_BASE_URL}/oauth/yandex`,
  },
};
