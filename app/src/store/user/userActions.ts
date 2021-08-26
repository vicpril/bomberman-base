import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'api/auth';
import {
  ChangePasswordRequest, SignInRequest, SignUpRequest, UserRequest,
} from 'api/types';
import { usersAPI } from 'api/users';
import { setIsLoadingShown } from 'store/requestStatus/requestStatusActions';
import { RootState } from 'store/store';

export enum UserActionType {
  INFO = 'user/getUserInfoAsync',
  LOGIN = 'user/loginAsync',
  LOGOUT = 'user/logoutAsync',
  REGISTER = 'user/registerAsync',
  UPDATE = 'user/updateUserAsync',
  CHANGE_PASSWORD = 'user/changePasswordAsync',
  CHANGE_AVATAR = 'user/changeAvatarAsync',
  GET_THEME = 'user/getUserThemeAsync',
  TOGGLE_THEME = 'user/toggleUserThemeAsync',
 }

export const getUserInfoAsync = createAsyncThunk(
  UserActionType.INFO,
  async (nodata, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      const userInfo = await authAPI.getUserInfo();
      return userInfo;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const loginAsync = createAsyncThunk(
  UserActionType.LOGIN,
  async (data: SignInRequest) => {
    const result = await authAPI.login(data);
    return result;
  },
);

export const logoutAsync = createAsyncThunk(
  UserActionType.LOGOUT,
  async () => {
    const result = await authAPI.logout();
    return result;
  },
);

export const registerAsync = createAsyncThunk(
  UserActionType.REGISTER,
  async (data: SignUpRequest) => {
    const result = await authAPI.register(data);
    return result;
  },
);

export const updateUserAsync = createAsyncThunk(
  UserActionType.UPDATE,
  async (data: UserRequest) => {
    const result = await usersAPI.update(data);
    return result;
  },
);

export const changePasswordAsync = createAsyncThunk(
  UserActionType.CHANGE_PASSWORD,
  async (data: ChangePasswordRequest) => {
    const result = await usersAPI.changePassword(data);
    return result;
  },
);

export const changeAvatarAsync = createAsyncThunk(
  UserActionType.CHANGE_AVATAR,
  async (data: FormData) => {
    const result = await usersAPI.changeAvatar(data);
    return result;
  },
);

export const getUserThemeAsync = createAsyncThunk<'light' | 'dark', null, {state: RootState}>(
  UserActionType.GET_THEME,
  async (nodata, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(false));
    try {
      const userTheme = await usersAPI.getTheme();
      const themeName = userTheme.themeId === '1' ? 'dark' : 'light';
      return themeName;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const toggleUserThemeAsync = createAsyncThunk<Promise<any>, null, {state: RootState}>(
  UserActionType.TOGGLE_THEME,
  async (nodata, thunkAPI) => {
    if (!thunkAPI.getState().user.isAuth) return null;

    const state = thunkAPI.getState();

    // Тема сменилась локально в момент pending
    const themeToSetName = state.user.theme;
    const themeToSetId = themeToSetName === 'light' ? 2 : 1;

    const response = await usersAPI.setTheme(themeToSetId);
    return response;
  },
);
