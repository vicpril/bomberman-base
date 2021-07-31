import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserState } from 'store/user/userSlice';

type PrivateRouteProps = {
  redirectTo: `/${string}`,
  redirectIfAuth?: boolean,
  path: string,
  component: FC,
  exact?: boolean
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  redirectTo, redirectIfAuth = false, component, ...rest
}) => {
  const { isAuth } = useSelector(getUserState);

  return isAuth === redirectIfAuth
    ? <Redirect to={redirectTo} />
    : <Route component={component} {...rest} />;
};
