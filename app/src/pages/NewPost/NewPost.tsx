import './styles.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';

export type NewPostPageProps = {
  className?: string
}

export const NewPost: FC<NewPostPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('forum')}</h1>

      <div className="post">
        <div className="post__title-container">
          <span className="post__title">topic title</span>
          <span className="post__title">{t('new_post')}</span>
        </div>

        <div className="post__input-container">
          <textarea className="post__text" placeholder={`${t('type_your_message_here')}...`} />
        </div>
      </div>

      <div className="page__footer-buttons">
        <BackButton />
        <GDButton title=":)" styleOption="secondary" size="l" />
        <GDButton title={`${t('post')} !`} styleOption="secondary" size="l" onClick={() => history.push('/topic')} />
      </div>
    </div>
  );
};
