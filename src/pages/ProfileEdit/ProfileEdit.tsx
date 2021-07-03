import './styles.css';
import React, {
  ChangeEventHandler,
  FC, useCallback, useEffect, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormProfile } from 'components/organisms/FormProfile/FormProfile';
import { SubmitedProfileData } from 'components/organisms/FormProfile/types';
import { FormMessageStatus } from 'components/molecules/Form/types';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { FormUpdateAvatar } from 'components/organisms/FormUpdateAvatar/FormUpdateAvatar';
import { useMountEffect } from 'hooks/useMountEffect';
import { useBoundAction } from 'hooks/useBoundAction';
import { getUserInfoAsync, updateUserAsync } from 'redux/user/userActions';
import { useSelector } from 'react-redux';
import { getUserState, userActions } from 'redux/user/userSlice';
import { useFormMessages } from 'hooks/useFormMessages';

export const ProfileEdit: FC = () => {
  const { t } = useTranslation();

  const getUserInfoAsyncBounded = useBoundAction(getUserInfoAsync);
  const updateUserInfoBounded = useBoundAction(userActions.update);
  const clearRequestBounded = useBoundAction(userActions.clearRequestState);
  const updateUserInfoAsyncBounded = useBoundAction(updateUserAsync);

  const {
    userInfo, isLoading, isUpdatedSuccessful, error,
  } = useSelector(getUserState);

  useMountEffect(() => getUserInfoAsyncBounded());

  const { message, status, buildMessage } = useFormMessages();

  const submitHandler = async (data: SubmitedProfileData) => {
    const requestData = { ...data, login: userInfo.login };
    updateUserInfoAsyncBounded(requestData);
  };

  const changeInputHandler = useCallback(
    (key: string): ChangeEventHandler<HTMLInputElement> => (e) => {
      const newProfile = {
        ...userInfo,
        [key]: e.target.value,
      };
      updateUserInfoBounded(newProfile);
    }, [userInfo, updateUserInfoBounded],
  );

  useMemo(() => {
    if (isUpdatedSuccessful) {
      buildMessage(t('updated_successfully'), FormMessageStatus.success);
    } else if (isLoading) {
      buildMessage(t('loading...'), FormMessageStatus.warning);
    } else if (error) {
      buildMessage(error.message ?? '', FormMessageStatus.error);
    } else {
      buildMessage('');
    }
  }, [isUpdatedSuccessful, error, isLoading, buildMessage, t]);

  useEffect(() => () => { clearRequestBounded(); }, [clearRequestBounded]);

  const pageTitle = t('userInfo');

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">{pageTitle}</h1>
      </div>
      <FormProfile
        user={userInfo}
        onSubmit={submitHandler}
        onChangeInput={changeInputHandler}
        message={message}
        messageClass={status}
      />
      <div className="userInfo-edit-actions">

        <FormUpdateAvatar />

        <Link to="/profile-password-edit">
          <GDButton title={t('change_password')} size="l" styleOption="secondary" />
        </Link>
      </div>
      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
