import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { Form } from 'components/molecules/Form/Form';
import { editProfilePasswordFields } from 'pages/ProfilePasswordEdit/constants';
import { FormMessageStatus, SubmitFormMethod } from 'components/molecules/Form/types';
import { useApiRequestFactory } from 'utils/api-factory';
import { usersAPI } from 'api/users';
import { ChangePasswordRequest } from 'api/types';
import { PasswordFormFields } from './types';

export type ProfilePasswordPageProps = {
  className?: string
}

export const ProfilePasswordEdit: FC<ProfilePasswordPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const [formMessage, setFormMessage] = useState('');
  const [formMessageStatus, setFormMessageStatus] = useState(FormMessageStatus.default);
  const setMessage = (text: string, type: FormMessageStatus = FormMessageStatus.default): void => {
    setFormMessage(() => text);
    setFormMessageStatus(type);
  };

  const { request: updatePassword } = useApiRequestFactory(usersAPI.changePassword);

  const submitHandler: SubmitFormMethod<PasswordFormFields> = async (data) => {
    // TODO verify data
    const requestData: ChangePasswordRequest = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      await updatePassword(requestData);
      setMessage(t('updated_successfully'), FormMessageStatus.success);
    } catch (error) {
      setMessage(error.message, FormMessageStatus.error);
    }
  };

  const formComponent = (
    <Form
      fields={editProfilePasswordFields}
      textSubmitButton={t('boom !')}
      onSubmit={submitHandler}
      message={formMessage}
      messageClass={formMessageStatus}
    />
  );

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('password_edit')}</h1>

      <div className="page__content">
        {formComponent}
      </div>

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
