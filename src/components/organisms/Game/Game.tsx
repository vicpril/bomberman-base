import React from 'react';

import { GameHeader } from './GameHeader/GameHeader';
import { GameContent } from './GameContent/GameContent';
import { GameFooter } from './GameFooter/GameFooter';
import { useObservable } from './core/hooks/useObservable';
import { gameService } from './services/gameService';

export const Game = () => {
  const status = useObservable(gameService.status);
  const score = useObservable(gameService.score);
  const timer = useObservable(gameService.timer);

  return (
    <div className="game-container">
      <GameHeader score={score} timer={timer} />
      <GameContent gameStatus={status} />
      <GameFooter />
    </div>
  );
};
