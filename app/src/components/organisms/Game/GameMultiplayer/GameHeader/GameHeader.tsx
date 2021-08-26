import './GameHeader.css';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { gameService, GameStatus } from '../../services/gameService';
import { useObservable } from '../../GameSingle/core/hooks/useObservable';

type GameHeaderProps = {
  gameStatus: GameStatus
  score?: number,
  timer?: number,
  bombs?: number,
}
export const GameHeader: FC<GameHeaderProps> = ({
  gameStatus, score, timer, bombs,
}) => {
  const { t } = useTranslation();

  const startingTimer = useObservable(gameService.startingTimer);

  const bombsLabel = (
    <span className="bombs-group">
      {t('bombs')}
      {': '}
      {bombs}
    </span>
  );
  const timerLabel = (
    <span className="timer-group">
      {t('timer')}
      {': '}
      {timer}
    </span>
  );
  const scoreLabel = (
    <span className="timer-group">
      {t('score')}
      {': '}
      {score}
    </span>
  );

  const headerComponent = useMemo(() => {
    switch (gameStatus) {
      default:
      case GameStatus.IN_PROGRESS:
        return (
          <div className="game-header">
            {bombsLabel}
            {timerLabel}
            {scoreLabel}
          </div>
        );

      case GameStatus.VICTORY:
        return (
          <div className="game-header">
            {bombsLabel}
            <span className="status victory">{t('victory')}</span>
            {scoreLabel}
          </div>
        );

      case GameStatus.DEFEAT:
        return (
          <div className="game-header">
            {bombsLabel}
            <span className="status defeat">{t('defeat')}</span>
            {bombsLabel}
          </div>
        );

      case GameStatus.WAITING_PLAYER:
        return (
          <div className="game-header">
            <span className="bombs-group">
              {t('waiting-an-opponent')}
              ...
            </span>
          </div>
        );
      case GameStatus.NOT_STARTED:
        return (
          <div className="game-header">
            <span className="bombs-group">
              {t('game-starts-in')}
              :
              {' '}
              {startingTimer?.toString()}
            </span>
          </div>
        );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, startingTimer, timer, bombs, score, t]);

  return headerComponent;
};
