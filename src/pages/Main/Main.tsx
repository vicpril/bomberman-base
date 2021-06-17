import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Main: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('main')}</h1>
    </div>
  );
};
