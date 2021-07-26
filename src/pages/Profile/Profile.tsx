import './styles.css';
import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useHistory } from 'react-router-dom';
import { useMountEffect } from 'hooks/useMountEffect';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'store/user/userSelectors';
import { getUserInfoAsync } from 'store/user/userActions';
import { useBoundAction } from 'hooks/useBoundAction';

export type ProfilePageProps = {
  className?: string
}

export const Profile: FC<ProfilePageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const getUserInfoAsyncBounded = useBoundAction(getUserInfoAsync);

  const {
    avatarSrc, login, first_name, phone, second_name, email,
  } = useSelector(selectUserInfo);

  useMountEffect(() => getUserInfoAsyncBounded());

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('profile')}</h1>

      <div className="page__content">
        <div className="profile-page__info">
          <div className="profile-page__avatar-container">
            <img className="profile-page__avatar" src={avatarSrc} alt={t('avatar')} />
          </div>
          <div className="profile-page__info-container">
            <span className="profile-page__nick-name">{login}</span>
            <span className="profile-page__name">{first_name}</span>
            <span className="profile-page__last-name">{second_name}</span>
            <span className="profile-page__phone">{phone}</span>
            <span className="profile-page__email">{email}</span>
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
