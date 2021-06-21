import './styles.css';
import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';

const leaderBoard = [
  { nickname: 'nick', score: 10000000 },
  { nickname: 'nickname', score: 1000000 },
  { nickname: 'nick', score: 100000 },
  { nickname: 'nicknam', score: 10000 },
  { nickname: 'nic', score: 5000 },
  { nickname: 'na', score: 1000 },
  { nickname: 'nickna', score: 500 },
  { nickname: 'nickname', score: 0 },
];

const dotCharacter = '. ';
const dotCount = 30;

export type LeaderBoardPageProps = {
  className?: string
}

export const LeaderBoard: FC<LeaderBoardPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const dots = new Array(dotCount + 1).join(dotCharacter);

  const digitsSplitter = (value: number): string => (
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  );

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('leaderboard')}</h1>

      <div className="page__content">
        <ul className="leaderboard-page__list">
          {leaderBoard.map(({ nickname, score }, index) => (
            <li className="leaderboard-page__list-item">
              <span className="leaderboard-page__list-nickname">{`${index + 1}. ${nickname}`}</span>
              <span className="leaderboard-page__list-dots">{dots}</span>
              <span className="leaderboard-page__list-score">{digitsSplitter(score)}</span>
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
