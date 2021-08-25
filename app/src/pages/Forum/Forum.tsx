import './styles.css';
import React, {
  FC, useEffect, useMemo,
} from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { topicsListHeader } from 'pages/Forum/constants';
import { useBoundAction } from 'hooks/useBoundAction';
import { getTopicsAsync, setActiveTopicId, setActiveTopicsPage } from 'store/forum/forumActions';
import { useSelector } from 'react-redux';
import { selectTopics } from 'store/forum/forumSelectors';
import { useMountEffect } from 'hooks/useMountEffect';
import { Paginator } from 'components/molecules/Paginator/Paginator';
import { getUserState } from 'store/user/userSlice';
import { Topic } from 'api/types';
import { getUserInfoAsync } from 'store/user/userActions';

export type ForumPageProps = {
  className?: string
}

export const Forum: FC<ForumPageProps> = ({ className }) => {
  const { t } = useTranslation();
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listHeader = useMemo(() => topicsListHeader.map((item) => t(item)), []);
  const history = useHistory();
  const getTopicsAsyncBounded = useBoundAction(getTopicsAsync);
  const setActiveTopicIdBounded = useBoundAction(setActiveTopicId);
  const { topicsList, topicsPagesCount, activeTopicsPage } = useSelector(selectTopics);
  const setActivePageBounded = useBoundAction(setActiveTopicsPage);
  const { isAuth } = useSelector(getUserState);
  const getUserInfoAsyncBounded = useBoundAction(getUserInfoAsync);

  useMountEffect(() => getUserInfoAsyncBounded());
  useEffect(() => getTopicsAsyncBounded(activeTopicsPage), [activeTopicsPage, getTopicsAsyncBounded]);

  const topicClickHandler = (topicId: number) => {
    setActiveTopicIdBounded(topicId);
    history.push(`/topic/${topicId}`);
  };

  const renderTopics = (topics: Topic[]) => topics.map(({
    id,
    title,
    owner,
    views,
    updatedAt,
    commentsCount,
  }) => {
    const parsedDate = new Date(updatedAt).toLocaleDateString();

    return (
      <button className="forum__topic-list-item" onClick={() => topicClickHandler(id)} key={id}>
        <span className="forum__topic-list-item_align-left">{title}</span>
        <span>{owner}</span>
        <span>{commentsCount}</span>
        <span>{views}</span>
        <time>{parsedDate}</time>
      </button>
    );
  });

  const startTopicOption = isAuth && (
    <GDButton
      title={t('start_new_topic')}
      styleOption="secondary"
      size="l"
      onClick={() => history.push('/new-topic')}
    />
  );

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('forum')}</h1>
      <div className="forum">
        <span className="forum__header">
          {listHeader.map((item) => <GDButton key={item} title={item} styleOption="secondary" size="l" />)}
        </span>
        <span className="forum__topics-list">
          {renderTopics(topicsList)}
        </span>
        <Paginator pagesCount={topicsPagesCount} currentPage={activeTopicsPage} pageChanger={setActivePageBounded} />
      </div>

      <div className="page__footer-buttons">
        <GDButton title={t('back')} styleOption="secondary" size="l" onClick={() => history.push('/')} />
        {startTopicOption}
      </div>
    </div>
  );
};
