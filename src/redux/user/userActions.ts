import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'api/auth';
import {
  ChangePasswordRequest, SignInRequest, SignUpRequest, UserRequest,
} from 'api/types';
import { usersAPI } from 'api/users';

export enum UserActionType {
  info = 'user/getUserInfoAsync',
  login = 'user/loginAsync',
  logout = 'user/logoutAsync',
  register = 'user/registerAsync',
  update = 'user/updateUserAsync',
  changePassword= 'user/changePasswordAsync',
  changeAvatar = 'user/changeAvatarAsync',
 }

export const getUserInfoAsync = createAsyncThunk(
  UserActionType.info,
  async () => {
    const userInfo = await authAPI.getUserInfo();
    return userInfo;
  },
);

export const loginAsync = createAsyncThunk(
  UserActionType.login,
  async (data: SignInRequest) => {
    const result = await authAPI.login(data);
    return result;
  },
);

export const logoutAsync = createAsyncThunk(
  UserActionType.logout,
  async () => {
    const result = await authAPI.logout();
    return result;
  },
);

export const registerAsync = createAsyncThunk(
  UserActionType.register,
  async (data: SignUpRequest) => {
    const result = await authAPI.register(data);
    return result;
  },
);

export const updateUserAsync = createAsyncThunk(
  UserActionType.update,
  async (data: UserRequest) => {
    const result = await usersAPI.update(data);
    return result;
  },
);

export const changePasswordAsync = createAsyncThunk(
  UserActionType.changePassword,
  async (data: ChangePasswordRequest) => {
    const result = await usersAPI.changePassword(data);
    return result;
  },
);

export const changeAvatarAsync = createAsyncThunk(
  UserActionType.changeAvatar,
  async (data: FormData) => {
    const result = await usersAPI.changeAvatar(data);
    return result;
  },
);
