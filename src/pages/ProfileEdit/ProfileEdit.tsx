import './styles.css';
import React, {
  ChangeEventHandler,
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { authAPI } from 'api/auth';
import { useHistory, Link } from 'react-router-dom';
import { UserResponse } from 'api/types';
import { FormProfile } from 'components/organisms/FormProfile/FormProfile';
import { usersAPI } from 'api/users';
import { SubmitedProfileData } from 'components/organisms/FormProfile/types';
import { useApiRequestFactory } from 'utils/api-factory';
import { FormMessageStatus } from 'components/molecules/Form/types';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useMountEffect } from 'utils/useMountEffect';

export const ProfileEdit: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    request: getUserInfo, isLoading: isUserLoading,
  } = useApiRequestFactory(authAPI.getUserInfo);
  const {
    request: updateUser, isLoading: isUserUpdating,
  } = useApiRequestFactory(usersAPI.update);
  const {
    request: uploadAvatar, isLoading: isAvatarUploading,
  } = useApiRequestFactory(usersAPI.changeAvatar);

  const isLoading = isUserLoading || isUserUpdating || isAvatarUploading;

  const [profile, setProfile] = useState({} as UserResponse);

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

  const [formMessage, setFormMessage] = useState('');
  const [formMessageStatus, setFormMessageStatus] = useState(FormMessageStatus.default);
  const setMessage = (text: string, type: FormMessageStatus = FormMessageStatus.default): void => {
    setFormMessage(() => text);
    setFormMessageStatus(type);
  };

  const pageTitle = t('profile');

  const submitHandler = async (data: SubmitedProfileData) => {
    const requestData = { ...data, login: profile.login };
    setFormMessage('');
    try {
      await updateUser(requestData);
      setMessage(t('updated_successfully'), FormMessageStatus.success);
    } catch (error) {
      setMessage(error.message, FormMessageStatus.error);
    }
  };

  useEffect(() => {
    const text = t('loading...');
    if (isLoading) {
      setMessage(text, FormMessageStatus.warning);
    } else {
      setFormMessage((prev) => (prev === text ? '' : prev));
    }
  }, [isLoading, t]);

  const formAvatar = useRef<HTMLFormElement>(null);

  const changeAvatarHandler: ChangeEventHandler<HTMLInputElement> = async () => {
    if (formAvatar?.current) {
      const formData = new FormData(formAvatar.current);
      setFormMessage('');
      try {
        await uploadAvatar(formData);
        setMessage(t('updated_successfully'), FormMessageStatus.success);
      } catch (error) {
        setMessage(error.message, FormMessageStatus.error);
      }
    }
  };

  const changeInputHandler = useCallback(
    (key: string): ChangeEventHandler<HTMLInputElement> => (e) => {
      setProfile(() => ({
        ...profile,
        [key]: e.target.value,
      }));
    }, [profile],
  );

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">{pageTitle}</h1>
      </div>
      <FormProfile
        user={profile}
        onSubmit={submitHandler}
        onChangeInput={changeInputHandler}
        message={formMessage}
        messageClass={formMessageStatus}
      />
      <div className="profile-edit-actions">
        <form ref={formAvatar}>
          <label htmlFor="avatar" className={classNames(['btn', 'btn-secondary', 'size_l', 'profile__upload_avatar__label'])}>
            {t('upload_avatar')}
            <input type="file" name="avatar" id="avatar" onChange={changeAvatarHandler} />
          </label>

          <Link to="/profile-password-edit">
            <GDButton title={t('change_password')} size="l" styleOption="secondary" />
          </Link>
        </form>
      </div>
      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
