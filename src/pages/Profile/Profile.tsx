import './styles.css';
import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import avatarDummy from 'assets/images/logo_img_base.png';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useHistory } from 'react-router-dom';

export type ProfilePageProps = {
  className?: string
}

export const Profile: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('profile')}</h1>

      <div className="page__content">
        <div className="profile-page__info">
          <div className="profile-page__avatar-container">
            <img className="profile-page__avatar" src={avatarDummy} alt={t('avatar')} />
          </div>
          <div className="profile-page__info-container">
            <span className="profile-page__nick-name">nick</span>
            <span className="profile-page__name">name</span>
            <span className="profile-page__last-name">last-name</span>
            <span className="profile-page__phone">1-234-567-890</span>
            <span className="profile-page__email">e-mail@mail.com</span>
          </div>
        </div>

        <GDButton title={t('edit')} styleOption="primary" onClick={() => history.push('/profile-edit')} />
      </div>

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
