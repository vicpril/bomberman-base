import './GameContent.css';
import React, { FC, useMemo } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';
import { FullScreenHandle } from 'react-full-screen';
import { GameStatus, gameService } from '../services/gameService';
import { Canvas as CanvasComponent } from '../Canvas/Canvas';
import { GameContentInside } from './GameContentInside';

type GameContentProps = {
  gameStatus: GameStatus,
  stage: number,
  fullScreenHandle: FullScreenHandle
}
export const GameContent: FC<GameContentProps> = ({ gameStatus, stage, fullScreenHandle }) => {
  const { t } = useTranslation();

  const startGameHandler = () => {
    gameService.startGame();
  };

  const nextStageGameHandler = () => {
    gameService.startGame(false);
  };

  const stageText = `${t('stage')}: ${stage}`;

  const content = useMemo(() => {
    switch (gameStatus) {
      default:
      case GameStatus.NOT_STARTED:
        return (
          <>
            <GDButton title={t('start_game')} size="l" onClick={startGameHandler} />
            {fullScreenHandle.active
              ? <GDButton title={t('exit_fullscreen_mode')} size="l" onClick={fullScreenHandle.exit} />
              : <GDButton title={t('enter_fullscreen_mode')} size="l" onClick={fullScreenHandle.enter} />}
          </>
        );
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, stageText, t, fullScreenHandle.active]);

  return (
    <div className="game-content">
      <div className="content-wrapper">
        {content}
      </div>
    </div>
  );
};
