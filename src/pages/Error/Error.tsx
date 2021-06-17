import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Error: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('error')}</h1>
    </div>
  );
};
