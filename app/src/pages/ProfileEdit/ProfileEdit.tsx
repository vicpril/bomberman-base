import './styles.css';
import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { FormUpdateAvatar } from 'components/organisms/FormUpdateAvatar/FormUpdateAvatar';
import { useMountEffect } from 'hooks/useMountEffect';
import { useBoundAction } from 'hooks/useBoundAction';
import { getUserInfoAsync, updateUserAsync } from 'store/user/userActions';
import { useSelector } from 'react-redux';
import { getUserState, userActions } from 'store/user/userSlice';
import { useModal } from 'components/molecules/Modal/useModal';
import { Modal } from 'components/molecules/Modal/Modal';
import { GDFormikForm } from 'components/molecules/GDFormikForm/GDFormikForm';
import { editProfileFormFields, validationSchemaConstructor } from 'pages/ProfileEdit/constants';
import { TSubmitFormMethod } from 'components/molecules/GDFormikForm/types';
import { TProfileFormFields } from 'pages/ProfileEdit/types';

export const ProfileEdit: FC = () => {
  const { t } = useTranslation();
  const modal = useModal();
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validationSchema = useMemo(() => validationSchemaConstructor(t), []);

  const getUserInfoAsyncBounded = useBoundAction(getUserInfoAsync);
  const clearRequestBounded = useBoundAction(userActions.clearRequestState);
  const updateUserInfoAsyncBounded = useBoundAction(updateUserAsync);

  const {
    userInfo, isLoading, isUpdatedSuccessful, error,
  } = useSelector(getUserState);

  useMountEffect(() => getUserInfoAsyncBounded());

  const submitHandler: TSubmitFormMethod<TProfileFormFields> = async (data) => {
    const requestData = { ...data, login: userInfo.login };
    updateUserInfoAsyncBounded(requestData);
  };

  useMemo(() => {
    if (isUpdatedSuccessful) {
      modal.show(t('updated_successfully'));
    } else if (error) {
      modal.show(error.message ?? '');
    } else {
      modal.hide();
    }
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatedSuccessful, isLoading, error]);

  useEffect(() => () => { clearRequestBounded(); }, [clearRequestBounded]);

  return (
    <div className="page">
      <Modal {...modal.bind} />
      <h1 className="page__title">{t('profile_edit')}</h1>
      <GDFormikForm
        fields={Object.values(editProfileFormFields)}
        initialValues={userInfo}
        validationSchema={validationSchema}
        textSubmitButton={t('submit')}
        onSubmit={submitHandler}
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
