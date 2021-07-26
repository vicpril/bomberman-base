import React, { FC, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { editProfilePasswordFields, validationSchemaConstructor } from 'pages/ProfilePasswordEdit/constants';
import { ChangePasswordRequest } from 'api/types';
import { useBoundAction } from 'hooks/useBoundAction';
import { changePasswordAsync } from 'store/user/userActions';
import { useSelector } from 'react-redux';
import { getUserState, userActions } from 'store/user/userSlice';
import { useModal } from 'components/molecules/Modal/useModal';
import { Modal } from 'components/molecules/Modal/Modal';
import { GDFormikForm } from 'components/molecules/GDFormikForm/GDFormikForm';
import { TSubmitFormMethod } from 'components/molecules/GDFormikForm/types';
import { TPasswordFormFields } from './types';

export type ProfilePasswordPageProps = {
  className?: string
}

export const ProfilePasswordEdit: FC<ProfilePasswordPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const modal = useModal();
  const validationSchema = useMemo(() => validationSchemaConstructor(t), [t]);

  const changePassAsyncBounded = useBoundAction(changePasswordAsync);
  const clearRequestBounded = useBoundAction(userActions.clearRequestState);

  const { isLoading, isUpdatedSuccessful, error } = useSelector(getUserState);

  const submitHandler: TSubmitFormMethod<TPasswordFormFields> = async (data) => {
    const requestData: ChangePasswordRequest = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    changePassAsyncBounded(requestData);
  };

  useMemo(() => {
    if (isUpdatedSuccessful) {
      modal.show(t('updated_successfully'));
    } else if (error) {
      modal.show(error.message ?? '');
    } else {
      modal.hide();
    }
  }, [isUpdatedSuccessful, error, isLoading, t]);

  useEffect(() => () => { clearRequestBounded(); }, [clearRequestBounded]);

  return (
    <div className={classnames(['page', className])}>
      <Modal {...modal.bind} />

      <h1 className="page__title">{t('password_edit')}</h1>

      <div className="page__content">
        <GDFormikForm
          fields={Object.values(editProfilePasswordFields)}
          validationSchema={validationSchema}
          textSubmitButton={t('submit')}
          onSubmit={submitHandler}
        />
      </div>

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
