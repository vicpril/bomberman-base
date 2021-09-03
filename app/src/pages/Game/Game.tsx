import React, { FC, useEffect } from 'react';
import { Game as GameComponent } from 'components/organisms/Game/Game';
import { userActions } from 'store/user/userSlice';
import { useBoundAction } from 'hooks/useBoundAction';
import { getUserInfoAsync } from 'store/user/userActions';
import { useMountEffect } from 'hooks/useMountEffect';

export const Game: FC = () => {
  const clearRequestBounded = useBoundAction(userActions.clearRequestState);
  const getUserInfoAsyncBounded = useBoundAction(getUserInfoAsync);

  useEffect(() => () => { clearRequestBounded(); }, [clearRequestBounded]);
  useMountEffect(() => { getUserInfoAsyncBounded(); });

  return (
    <GameComponent />
  );
};
