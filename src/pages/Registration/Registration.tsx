import './styles.css';
import React, { FC, useMemo } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { FormMessageStatus, SubmitFormMethod } from 'components/molecules/Form/types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Form } from 'components/molecules/Form/Form';
import { useSelector } from 'react-redux';
import { getUserState } from 'redux/user/userSlice';
import { useBoundAction } from 'hooks/useBoundAction';
import { registerAsync } from 'redux/user/userActions';
import { useFormMessages } from 'hooks/useFormMessages';
import { registerFormFields } from './constants';
import { RefistrationFormFields } from './types';

export const Registration: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { error, isLoading } = useSelector(getUserState);
  const registerAsyncBuonded = useBoundAction(registerAsync);

  const { message, status, buildMessage } = useFormMessages();

  const submitHandler: SubmitFormMethod<RefistrationFormFields> = async (data) => {
    registerAsyncBuonded(data);
  };

  useMemo(() => {
    if (isLoading) {
      buildMessage(t('loading...'), FormMessageStatus.warning);
    } else if (error) {
      buildMessage(error.message ?? '', FormMessageStatus.error);
    } else {
      buildMessage('');
    }
  }, [error, isLoading, buildMessage, t]);

  const registerForm = (
    <Form
      className="register-form"
      fields={registerFormFields}
      textSubmitButton={t('submit')}
      onSubmit={submitHandler}
      message={message}
      messageClass={status}
    />
  );

  const pageTitle = t('registration');

  const backHandler = () => {
    history.goBack();
  };
  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">{pageTitle}</h1>
      </div>
      {registerForm}
      <div className="page__footer">
        <GDButton
          className="page__footer-item"
          title="back"
          styleOption="secondary"
          size="l"
          onClick={backHandler}
        />
      </div>
    </div>
  );
};
