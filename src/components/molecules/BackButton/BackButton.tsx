import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const BackButton: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <GDButton
      title={t('back')}
      styleOption="secondary"
      size="l"
      onClick={() => history.goBack()}
    />
  );
};
