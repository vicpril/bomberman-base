import './styles.css';
import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { SEPARATOR, SEPARATOR_LENGTH, RECORDS_PER_PAGE } from 'pages/LeaderBoard/constants';
import { useBoundAction } from 'hooks/useBoundAction';
import { getLeaderboardAsync } from 'store/leaderboard/leaderboardActions';
import { useMountEffect } from 'hooks/useMountEffect';
import { useSelector } from 'react-redux';
import { selectLeaderboard } from 'store/leaderboard/leaderboardSelectors';

export const LeaderBoard: FC = () => {
  const { t } = useTranslation();
  const dots = useMemo(() => new Array(SEPARATOR_LENGTH + 1).join(SEPARATOR), []);
  const getLeaderboardAsyncBounded = useBoundAction(getLeaderboardAsync);
  const { leaderboard } = useSelector(selectLeaderboard);

  const splitDigits = (value: number): string => (
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  );

  useMountEffect(() => getLeaderboardAsyncBounded({
    ratingFieldName: 'scoreFieldGD',
    cursor: 0,
    limit: RECORDS_PER_PAGE,
  }));

  return (
    <div className={classnames(['page'])}>

      <h1 className="page__title">{t('leaderboard')}</h1>

      <div className="page__content">
        {leaderboard.length === 0 && <p>{t('no_data')}</p>}
        <ul className="leaderboard-page__list">
          {leaderboard.map(({ displayName, scoreFieldGD }, index) => (
            <li className="leaderboard-page__list-item" key={displayName}>
              <span className="leaderboard-page__list-nickname">{`${index + 1}. ${displayName}`}</span>
              <span className="leaderboard-page__list-dots">{dots}</span>
              <span className="leaderboard-page__list-score">{splitDigits(scoreFieldGD)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
