/* eslint-disable no-underscore-dangle */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { leaderboardReducer } from 'store/leaderboard/leaderboardSlice';
import { connectRouter } from 'connected-react-router';
import { History, createBrowserHistory, createMemoryHistory } from 'history';
import { isServer } from 'utils/ssrUtils';
import { requestStatusReducer } from './requestStatus/requestStatusSlice';
import { userReducer } from './user/userSlice';

declare global {
  interface Window {
      __INITIAL_STATE__: any;
  }
}

const initialState = isServer ? undefined : window.__INITIAL_STATE__;
if (!isServer && window.__INITIAL_STATE__) {
  delete window.__INITIAL_STATE__;
}

const history = isServer
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory();

export const createRootReducer = (hist: History) => combineReducers({
  router: connectRouter(hist),
  user: userReducer,
  requestStatus: requestStatusReducer,
  leaderboard: leaderboardReducer,
});

// TODO: конфигурировать при запуске сервера только один стор на сервере.
// Сейчас конфигурируется 2 и тот, который экспортируется из 'store/store' - на сервере не используется.

// Используется только на клиенте с preloadedState, на сервере стор конфигурируется в serverRenderMiddleware
// тк его нужно создавать заново для каждого запроса
export const store = configureStore({
  reducer: createRootReducer(history),
  // eslint-disable-next-line no-underscore-dangle
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
