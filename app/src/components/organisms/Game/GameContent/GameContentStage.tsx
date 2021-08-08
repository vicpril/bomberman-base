import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type GameContentStageProps = {
  stage: number
}
export const GameContentStage: FC<GameContentStageProps> = ({ stage }) => {
  const { t } = useTranslation();

  return (
    <p>
      {t('stage')}
      {': '}
      {stage}
    </p>
  );
};
