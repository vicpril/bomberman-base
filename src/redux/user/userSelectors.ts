import { RootState } from 'redux/store';

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectTheme = (state: RootState) => state.user.theme;
