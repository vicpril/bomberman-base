import './styles.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { dummyTopics, topicsListHeader } from 'pages/Forum/constants';

export type ForumPageProps = {
  className?: string
}

export const Forum: FC<ForumPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const listHeader = topicsListHeader.map((item) => t(item));
  const history = useHistory();

  return (
    <div className={classNames(['page', className])}>

      <h1 className="page__title">{t('forum')}</h1>

      <div className="forum">
        <span className="forum__header">
          {listHeader.map((item) => <GDButton key={item} title={item} styleOption="secondary" size="l" />)}
        </span>
        <div className="forum__topics-list">
          {dummyTopics.map(({
            topic,
            author,
            postCount,
            viewsCount,
            lastReplay,
          }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index} className="forum__topic-list-item">
              <span className="forum__topic-list-item_align-left">{topic}</span>
              <span>{author}</span>
              <span>{postCount}</span>
              <span>{viewsCount}</span>
              <time>{lastReplay}</time>
            </span>
          ))}
        </div>
      </div>

      <div className="page__footer-buttons">
        <BackButton />
        <GDButton
          title={t('start_new_topic')}
          styleOption="secondary"
          size="l"
          onClick={() => history.push('/topic')}
        />
      </div>
    </div>
  );
};
