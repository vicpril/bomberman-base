import './GameContent.css';
import React, { FC, useMemo } from 'react';
import { gameService, GameStatus } from '../services/gameService';
import { Canvas as CanvasComponent } from '../Canvas/Canvas';

type GameContentProps = {
  gameStatus: GameStatus,
}
export const GameContent: FC<GameContentProps> = ({ gameStatus }) => {
  const startGameHandler = () => {
    gameService.startGame();
  };

  const content = useMemo(() => {
    switch (gameStatus) {
      default:
      case GameStatus.NOT_STARTED:
        return <button type="button" onClick={startGameHandler}>Start Game</button>;

      case GameStatus.IN_PROGRESS:
        return <CanvasComponent />;

      case GameStatus.FINISHED:
        return (
          <>
            <p style={{ color: 'white' }}>Game over</p>
            <button type="button" onClick={startGameHandler}>Try again</button>
          </>
        );
    }
  }, [gameStatus]);

  return (
    <div className="game-content">
      {content}
    </div>
  );
};
