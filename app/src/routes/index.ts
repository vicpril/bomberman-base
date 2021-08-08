import { Dispatch, FC } from 'react';
import { match } from 'react-router';
import { Main } from 'pages/Main/Main';
import { Login } from 'pages/Login/Login';
import { Registration } from 'pages/Registration/Registration';
import { Forum } from 'pages/Forum/Forum';
import { Game } from 'components/organisms/Game/Game';
import { LeaderBoard } from 'pages/LeaderBoard/LeaderBoard';
import { Profile } from 'pages/Profile/Profile';
import { ProfileEdit } from 'pages/ProfileEdit/ProfileEdit';
import { ProfilePasswordEdit } from 'pages/ProfilePasswordEdit/ProfilePasswordEdit';
import { Topic } from 'pages/Topic/Topic';
import { NewPost } from 'pages/NewPost/NewPost';
import { Error } from 'pages/Error/Error';
import { toggleTheme } from 'store/user/userSlice';

type RouterFetchDataArgs = {
  dispatch: Dispatch<any>;
  match: match<{ slug: string }>;
};

export type RouteType = {
  path: string,
  component: FC,
  exact?: boolean,
  privateRoute?: {
    redirectTo: `/${string}`,
    redirectIfAuth?: boolean,
  },
  fetchData?: (args: RouterFetchDataArgs) => void
}

type RoutesType = RouteType[]

export const routes: RoutesType = [
  {
    path: '/',
    component: Main,
    exact: true,
    privateRoute: {
      redirectTo: '/login',
    },
    // для примера переключим темку только на главной странице
    fetchData({ dispatch }: RouterFetchDataArgs) {
      dispatch(toggleTheme());
    },
  },
  {
    path: '/login',
    component: Login,
    privateRoute: {
      redirectTo: '/',
      redirectIfAuth: true,
    },
  },
  {
    path: '/registration',
    component: Registration,
    privateRoute: {
      redirectTo: '/',
      redirectIfAuth: true,
    },
  },
  {
    path: '/forum',
    component: Forum,
  },
  {
    path: '/game',
    component: Game,
  },
  {
    path: '/leaderboard',
    component: LeaderBoard,
  },
  {
    path: '/profile',
    component: Profile,
    privateRoute: {
      redirectTo: '/login',
    },
  },
  {
    path: '/profile-edit',
    component: ProfileEdit,
    privateRoute: {
      redirectTo: '/login',
    },
  },
  {
    path: '/profile-password-edit',
    component: ProfilePasswordEdit,
    privateRoute: {
      redirectTo: '/login',
    },
  },
  {
    path: '/topic',
    component: Topic,
  },
  {
    path: '/new-post',
    component: NewPost,
  },
  {
    path: '*',
    component: Error,
  },
];
