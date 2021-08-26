import './GameContent.css';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FullScreenHandle } from 'react-full-screen';
import { GameStatus, gameService, GameMode } from '../../services/gameService';
import { Canvas as CanvasComponent } from '../Canvas/Canvas';
import { GameContentInside } from './GameContentInside';

type GameContentProps = {
  gameStatus: GameStatus,
  stage: number,
  fullScreenHandle: FullScreenHandle
}
export const GameContent: FC<GameContentProps> = ({ gameStatus, stage, fullScreenHandle }) => {
  const { t } = useTranslation();

  const startGameHandler = (multi = false) => {
    const options = multi ? { mode: GameMode.MULTI_PLAYER } : {};
    gameService.startGame(options);
  };

  const nextStageGameHandler = () => {
    gameService.startGame({ reset: false });
  };

  const stageText = `${t('stage')}: ${stage}`;

  const content = useMemo(() => {
    switch (gameStatus) {
      default:
      case GameStatus.SHOW_STAGE:
        return <GameContentInside text={stageText} />;

      case GameStatus.IN_PROGRESS:
        return <CanvasComponent key={Date.now()} />;

      case GameStatus.STAGE_COMPLETED:
        return (
          <GameContentInside
            text={t('victory')}
            buttonText={t('continue')}
            onButtonClick={nextStageGameHandler}
          />
        );

      case GameStatus.FINISHED:
        return (
          <GameContentInside
            text={t('game_over')}
            buttonText={t('play_again')}
            onButtonClick={startGameHandler}
          />
        );
    }
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, stageText, fullScreenHandle.active]);

  return (
    <div className="game-content">
      <div className="content-wrapper">
        {content}
      </div>
    </div>
  );
};
