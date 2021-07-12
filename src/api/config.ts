export const AUTH_TOKEN_NAME = 'bomberman_auth_token';

export const API_BASE_URL = 'https://ya-praktikum.tech/api/v2';

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
};
