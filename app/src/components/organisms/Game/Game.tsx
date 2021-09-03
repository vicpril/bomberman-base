import './Game.css';
import React, { FC, useEffect } from 'react';

import { useMountEffect } from 'hooks/useMountEffect';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';
import { useBoundAction } from 'hooks/useBoundAction';
import { addLeaderAsync } from 'store/leaderboard/leaderboardActions';
import { SCORE_FIELD_NAME } from 'api/types';
import { getUserState } from 'store/user/userSlice';
import { useSelector } from 'react-redux';
import { GameHeader as SingleGameHeader } from './GameSingle/GameHeader/GameHeader';
import { GameContent as SingleGameContent } from './GameSingle/GameContent/GameContent';
import { GameFooter as SingleGameFooter } from './GameSingle/GameFooter/GameFooter';
import { GameHeader as MultiplayerGameHeader } from './GameMultiplayer/GameHeader/GameHeader';
import { GameContent as MultiplayerGameContent } from './GameMultiplayer/GameContent/GameContent';
import { GameFooter as MultiplayerGameFooter } from './GameMultiplayer/GameFooter/GameFooter';
import { useObservable } from './GameSingle/core/hooks/useObservable';
import { GameMode, gameService, GameStatus } from './services/gameService';

export const Game: FC = () => {
  const stage = useObservable(gameService.stage);
  const status = useObservable(gameService.status);
  const score = useObservable(gameService.score);
  const timer = useObservable(gameService.timer);
  const bombs = useObservable(gameService.bombs);
  const fullScreenHandle = useFullScreenHandle();
  const { t } = useTranslation();
  const addLeaderAsyncBounded = useBoundAction(addLeaderAsync);
  const { isAuth, userInfo } = useSelector(getUserState);

  useMountEffect(() => () => {
    gameService.destroyMultiplayerGame();
    gameService.exitGame();
  });

  const startSingleGameHandler = () => {
    gameService.setMode(GameMode.SINGLE_PLAYER);
    gameService.startGame({});
  };

  const startMultiplayerGameHandler = () => {
    gameService.setMode(GameMode.MULTI_PLAYER);
    gameService.initMultiplayerGame();
  };

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    const isVictory = status === GameStatus.VICTORY;
    const isDefeat = status === GameStatus.DEFEAT;
    const isFinished = status === GameStatus.FINISHED;

    if (isVictory || isDefeat || isFinished) {
      const requestData = {
        data: {
          displayName: `${userInfo.first_name} ${userInfo.second_name}`,
          scoreFieldGD: score,
        },
        ratingFieldName: SCORE_FIELD_NAME,
      };

      addLeaderAsyncBounded(requestData);
    }
  }, [status, userInfo, isAuth, score, addLeaderAsyncBounded]);

  const startScreen = (
    <div className="game-start_screen">
      <GDButton title={t('single_player')} size="l" onClick={() => startSingleGameHandler()} />
      <GDButton title={t('multi_player')} size="l" onClick={() => startMultiplayerGameHandler()} />
      {fullScreenHandle.active
        ? <GDButton title={t('exit_fullscreen_mode')} size="l" onClick={fullScreenHandle.exit} />
        : <GDButton title={t('enter_fullscreen_mode')} size="l" onClick={fullScreenHandle.enter} />}
    </div>
  );

  const mainScreen = gameService.mode.get() === GameMode.SINGLE_PLAYER
    ? (
      <>
        <SingleGameHeader score={score} timer={timer} bombs={bombs} />
        <SingleGameContent gameStatus={status} stage={stage} fullScreenHandle={fullScreenHandle} />
        <SingleGameFooter />
      </>
    )
    : (
      <>
        <MultiplayerGameHeader gameStatus={status} score={score} timer={timer} bombs={bombs} />
        <MultiplayerGameContent
          gameStatus={status}
          stage={stage}
          fullScreenHandle={fullScreenHandle}
        />
        <MultiplayerGameFooter />
      </>
    );

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="game-container">
        { status === GameStatus.START_SCREEN && startScreen }
        { status !== GameStatus.START_SCREEN && mainScreen}
      </div>
    </FullScreen>
  );
};
