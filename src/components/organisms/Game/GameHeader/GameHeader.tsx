import './GameHeader.css';
import React, { FC } from 'react';

type GameHeaderProps = {
  score: number,
  timer: number
}
export const GameHeader: FC<GameHeaderProps> = ({ score, timer }) => (
  <div className="game-header">
    <span className="timer-group">
      Timer:
      {' '}
      {timer}
    </span>
    <span className="timer-group">
      Score:
      {' '}
      {score}
    </span>
  </div>
);
