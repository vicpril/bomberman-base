import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'api/auth';

export const getUserInfoAsync = createAsyncThunk(
  'user/getUserInfoAsync',
  async () => {
    const userInfo = await authAPI.getUserInfo();
    return userInfo;
  },
);
