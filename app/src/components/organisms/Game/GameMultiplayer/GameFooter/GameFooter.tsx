import './GameFooter.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { GameStatus } from '../../services/gameService';

type GameFooterProps = {
  gameStatus?: GameStatus
}

export const GameFooter: FC<GameFooterProps> = ({ gameStatus }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const backClickHandler = () => {
    history.push('/');
  };

  const playAgainClickHandler = () => {
    history.go(0);
  };

  return (
    <div className="game-footer">
      {(gameStatus === GameStatus.DEFEAT
      || gameStatus === GameStatus.VICTORY
      || gameStatus === GameStatus.FINISHED)
      && (
        <>
          <GDButton
            title={t('play_again')}
            styleOption="secondary"
            size="l"
            onClick={playAgainClickHandler}
          />
        </>
      )}

      <GDButton
        title={t('back')}
        styleOption="secondary"
        size="l"
        onClick={backClickHandler}
      />
    </div>
  );
};
