import { is } from 'typescript-is';
import { callApi } from '../utils/api-wrapper';
import {
  AUTH_TOKEN_NAME,
  PATHS,
} from './config';
import {
  ERROR_RESPONSE_DATA,
  LogOutResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserResponse,
} from './types';

export const authAPI = {
  login: async (data: SignInRequest): Promise<SignInResponse> => {
    try {
      const response = await callApi({
        method: 'post',
        url: PATHS.auth.signIn,
        data,
        authRequired: true,
      });

      if (response.data && is<SignInResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: async (): Promise<LogOutResponse> => {
    try {
      const response = await callApi({
        method: 'post',
        url: PATHS.auth.logout,
        authRequired: false,
      });

      if (response.data && is<LogOutResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  register: async (data: SignUpRequest): Promise<SignUpResponse> => {
    try {
      const response = await callApi({
        method: 'post',
        url: PATHS.auth.signUp,
        data,
        authRequired: true,
      });

      if (response.data && is<SignUpResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  isAuth: (): boolean => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    return Boolean(token);
  },

  getUserInfo: async (): Promise<UserResponse> => {
    try {
      const response = await callApi({
        method: 'get',
        url: PATHS.auth.userInfo,
        authRequired: true,
      });

      if (response.data && is<UserResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
