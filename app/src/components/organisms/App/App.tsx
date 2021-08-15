import './App.css';
import { hot } from 'react-hot-loader/root';
import React, { FC } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { NavHeader } from 'components/organisms/NavHeader/NavHeader';
import classNames from 'classnames';
import { ErrorBoundary } from 'components/organisms/ErrorBoundary/ErrorBoundary';
import { useSelector } from 'react-redux';
import { selectTheme } from 'store/user/userSelectors';
import { LoadingIndicator } from 'components/atoms/LoadingIndicator/LoadingIndicator';
import { userActions } from 'store/user/userSlice';
import { useBoundAction } from 'hooks/useBoundAction';
import { useMountEffect } from 'hooks/useMountEffect';
import { routes } from 'routes';
import { OAuthController } from 'services/oauth';
import { useHistory } from 'react-router';
import { startAllWorkers } from 'webWorkers/startAllWorkers';
import { RouteBuilder } from '../RouteBuilder/RouteBuilder';

export const App: FC = hot(() => {
  const theme = useSelector(selectTheme);

  const history = useHistory();
  const { search } = useLocation();

  const setAuthAfterOauth = useBoundAction(userActions.setAuth);

  useMountEffect(() => {
    startAllWorkers();

    const code = new URLSearchParams(search).get('code');
    if (code) {
      OAuthController.signIn(code).then(() => {
        setAuthAfterOauth(true);
        history.replace('/');
      });
    }
  });

  return (
    <div className={classNames(['app-container', `theme_${theme}`])}>
      <ErrorBoundary>
        <NavHeader />
      </ErrorBoundary>
      <Switch>
        {
          routes.map((routeProps) => <RouteBuilder key={routeProps.path} {...routeProps} />)
        }
      </Switch>
      <LoadingIndicator />
    </div>
  );
});
