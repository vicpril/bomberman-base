import React, { FC, useEffect } from 'react';
import { Game as GameComponent } from 'components/organisms/Game/Game';
import { userActions } from 'store/user/userSlice';
import { useBoundAction } from 'hooks/useBoundAction';

export const Game: FC = () => {
  const clearRequestBounded = useBoundAction(userActions.clearRequestState);
  useEffect(() => () => { clearRequestBounded(); }, [clearRequestBounded]);

  return (
    <GameComponent />
  );
};
