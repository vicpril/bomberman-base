import './App.css';
import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Forum } from 'pages/Forum';
import { Game } from 'pages/Game/Game';
import { LeaderBoard } from 'pages/LeaderBoard';
import { Login } from 'pages/Login';
import { Profile } from 'pages/Profile';
import { Registration } from 'pages/Registration';
import { Error } from 'pages/Error';
import { Start } from 'pages/Start';

export const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <div>
          <h1>Bomberman</h1>
        </div>
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/start" component={Start} />
      <Route path="/registration" component={Registration} />
      <Route path="/forum" component={Forum} />
      <Route path="/game" component={Game} />
      <Route path="/leaderboard" component={LeaderBoard} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={Error} />
    </Switch>
  </BrowserRouter>
);
