import './styles.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { dummyPosts, dummyTopicTitle } from 'pages/Topic/constants';

export type TopicPageProps = {
  className?: string
}

export const Topic: FC<TopicPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('forum')}</h1>

      <div className="topic">
        <span className="topic__title">{dummyTopicTitle}</span>

        <div className="topic__posts-list">
          {dummyPosts.map(({
            nickname, avatar, date, message,
          }) => (
            <span className="topic__post">
              <div className="topic__author-container">
                <div className="topic__avatar-container">
                  <img className="topic__avatar" src={avatar} alt="avatar" />
                </div>
                <span>{nickname}</span>
              </div>
              <div className="topic__content-container">
                <span>{date}</span>
                <span>{message}</span>
              </div>
            </span>
          ))}
        </div>
      </div>

      <div className="page__footer-buttons">
        <BackButton />
        <GDButton title={t('new_post')} styleOption="secondary" size="l" onClick={() => history.push('/new-post')} />
      </div>
    </div>
  );
};
