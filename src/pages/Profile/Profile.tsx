import './styles.css';
import React, { FC, useMemo, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import avatarDummy from 'assets/images/logo_img_base.png';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useHistory } from 'react-router-dom';
import { UserResponse } from 'api/types';
import { authAPI } from 'api/auth';
import { useApiRequestFactory } from 'utils/api-factory';
import { resourcesAPI } from 'api/resources';
import { useMountEffect } from 'utils/useMountEffect';

export type ProfilePageProps = {
  className?: string
}

export const Profile: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [profile, setProfile] = useState({} as UserResponse);

  const { request: getUserInfo } = useApiRequestFactory(authAPI.getUserInfo);

  const fetchProfile = async () => {
    try {
      const result = await getUserInfo();
      setProfile(() => result);
    } catch (error) {
      console.error(error);
    }
  };

  useMountEffect(() => {
    if (!authAPI.isAuth()) {
      history.replace('/login');
    }
    fetchProfile();
  });

  const avatarSrc = useMemo(() => (
    profile.avatar ? resourcesAPI.getResourceURL(profile.avatar) : avatarDummy
  ), [profile]);

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('profile')}</h1>

      <div className="page__content">
        <div className="profile-page__info">
          <div className="profile-page__avatar-container">
            <img className="profile-page__avatar" src={avatarSrc} alt={t('avatar')} />
          </div>
          <div className="profile-page__info-container">
            <span className="profile-page__nick-name">{profile.login}</span>
            <span className="profile-page__name">{profile.first_name}</span>
            <span className="profile-page__last-name">{profile.second_name}</span>
            <span className="profile-page__phone">{profile.phone}</span>
            <span className="profile-page__email">{profile.email}</span>
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
