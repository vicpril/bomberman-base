import { configureStore } from '@reduxjs/toolkit';
import { requestStatusReducer } from './requestStatus/requestStatusSlice';
import { userReducer } from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    requestStatus: requestStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
