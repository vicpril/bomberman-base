import './styles.css';
import React, { FC, MouseEventHandler, useState } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useBoundAction } from 'hooks/useBoundAction';
import { addTopicAsync } from 'store/forum/forumActions';
import { getUserState } from 'store/user/userSlice';
import { getUserInfoAsync } from 'store/user/userActions';
import { useMountEffect } from 'hooks/useMountEffect';

export type NewPostPageProps = {
  className?: string
}

export const NewTopic: FC<NewPostPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const user = useSelector(getUserState);
  const addTopicAsyncBounded = useBoundAction(addTopicAsync);
  const getUserInfoAsyncBounded = useBoundAction(getUserInfoAsync);
  const { isAuth } = useSelector(getUserState);

  useMountEffect(() => getUserInfoAsyncBounded());

  const startButtonHandler: MouseEventHandler = (event) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    addTopicAsyncBounded({
      username: `${user.userInfo.first_name} ${user.userInfo.second_name}`,
      title,
    });
    history.push('/forum');
  };

  const startTopicOption = isAuth && (
    <GDButton
      title={`${t('start_new_topic')} !`}
      styleOption="secondary"
      size="l"
      onClick={startButtonHandler}
    />
  );

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('new_topic')}</h1>
      <div className="new-topic">
        <div className="new-topic__input-container">
          <input
            className="new-topic__text"
            placeholder={`${t('enter_topic_title')}...`}
            onChange={(event) => (setTitle(event.target.value))}
          />
        </div>
      </div>
      <div className="page__footer-buttons">
        <GDButton title={t('back')} styleOption="secondary" size="l" onClick={() => history.push('/forum')} />
        {startTopicOption}
      </div>
    </div>
  );
};
