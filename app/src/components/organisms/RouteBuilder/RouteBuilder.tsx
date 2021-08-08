import React, { FC } from 'react';
import { RouteType } from 'routes';
import { ErrorBoundary } from 'components/organisms/ErrorBoundary/ErrorBoundary';
import { Route } from 'react-router';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

export const RouteBuilder: FC<Omit<RouteType, 'fetchData'>> = ({ privateRoute, ...routeProps }) => (
  <ErrorBoundary>
    {
      privateRoute
        ? <PrivateRoute key={routeProps.path} {...routeProps} {...privateRoute} />
        : <Route key={routeProps.path} {...routeProps} />
    }
  </ErrorBoundary>
);
