import './GameFooter.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const GameFooter: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const backClickHandler = () => {
    history.push('/');
  };

  return (
    <div className="game-footer">
      <GDButton
        title={t('back')}
        styleOption="secondary"
        size="l"
        onClick={backClickHandler}
      />
    </div>
  );
};
