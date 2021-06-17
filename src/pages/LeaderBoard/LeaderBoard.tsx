import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const LeaderBoard: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('leaderboard')}</h1>
    </div>
  );
};
