import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserState } from 'redux/user/userSlice';

type PrivateRouteProps = {
  to: `/${string}`,
  redirectIfAuth?: boolean,
  path: `/${string}`,
  component: FC,
  exact?: boolean
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  to, redirectIfAuth = false, component, ...rest
}) => {
  const { isAuth } = useSelector(getUserState);

  return isAuth === redirectIfAuth
    ? <Redirect to={to} />
    : <Route component={component} {...rest} />;
};
