import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';

type ActionCreator = (...args: any[]) => any;
type UseBoundAction = (actionCreator: ActionCreator) => any

export const useBoundAction: UseBoundAction = (actionCreator: ActionCreator) => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback((...args: any[]) => (
    dispatch(actionCreator(...args))
  ),
  [dispatch, actionCreator]);
};
