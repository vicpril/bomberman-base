import './App.css';
import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Forum } from 'pages/Forum/Forum';
import { Game } from 'pages/Game/Game';
import { LeaderBoard } from 'pages/LeaderBoard/LeaderBoard';
import { Login } from 'pages/Login/Login';
import { Profile } from 'pages/Profile/Profile';
import { ProfileEdit } from 'pages/ProfileEdit/ProfileEdit';
import { Registration } from 'pages/Registration/Registration';
import { Error } from 'pages/Error/Error';
import { ProfilePasswordEdit } from 'pages/ProfilePasswordEdit/ProfilePasswordEdit';
import { Topic } from 'pages/Topic/Topic';
import { NewPost } from 'pages/NewPost/NewPost';
import { Main } from 'pages/Main/Main';
import { NavHeader } from 'components/organisms/NavHeader/NavHeader';
import classNames from 'classnames';
import { ErrorBoundary } from 'components/organisms/ErrorBoundary/ErrorBoundary';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/user/userSelectors';

export const App: FC = () => {
  const theme = useSelector(selectTheme);

  return (
    <div className={classNames(['app-container', `theme_${theme}`])}>
      <BrowserRouter>
        <ErrorBoundary>
          <NavHeader />
        </ErrorBoundary>

        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <Main />
            </ErrorBoundary>
          </Route>

          <Route path="/login">
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          </Route>

          <Route path="/registration">
            <ErrorBoundary>
              <Registration />
            </ErrorBoundary>
          </Route>

          <Route path="/forum">
            <ErrorBoundary>
              <Forum />
            </ErrorBoundary>
          </Route>

          <Route path="/game">
            <ErrorBoundary>
              <Game />
            </ErrorBoundary>
          </Route>

          <Route path="/leaderboard">
            <ErrorBoundary>
              <LeaderBoard />
            </ErrorBoundary>
          </Route>

          <Route path="/profile">
            <ErrorBoundary>
              <Profile />
            </ErrorBoundary>
          </Route>

          <Route path="/profile-edit">
            <ErrorBoundary>
              <ProfileEdit />
            </ErrorBoundary>
          </Route>

          <Route path="/profile-password-edit">
            <ErrorBoundary>
              <ProfilePasswordEdit />
            </ErrorBoundary>
          </Route>

          <Route path="/topic">
            <ErrorBoundary>
              <Topic />
            </ErrorBoundary>
          </Route>

          <Route path="/new-post">
            <ErrorBoundary>
              <NewPost />
            </ErrorBoundary>
          </Route>

          <Route path="*">
            <ErrorBoundary>
              <Error />
            </ErrorBoundary>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
