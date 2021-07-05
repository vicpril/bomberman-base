import './styles.css';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GDLogo } from 'components/atoms/GDLogo/GDLogo';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { Form } from 'components/molecules/Form/Form';
import logoImage from 'assets/images/logo_img_base.png';
import { useTranslation } from 'react-i18next';
import { FormMessageStatus, SubmitFormMethod } from 'components/molecules/Form/types';
import { loginAsync } from 'redux/user/userActions';
import { useBoundAction } from 'hooks/useBoundAction';
import { useSelector } from 'react-redux';
import { getUserState } from 'redux/user/userSlice';
import { useFormMessages } from 'hooks/useFormMessages';
import { LoginFormFields } from './types';
import { loginFormFields } from './constants';

export const Login: FC = () => {
  const { t } = useTranslation();

  const { error, isLoading } = useSelector(getUserState);
  const loginAsyncBounded = useBoundAction(loginAsync);

  const { message, status, buildMessage } = useFormMessages();

  const submitHandler: SubmitFormMethod<LoginFormFields> = async (data) => {
    loginAsyncBounded(data);
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

  const formComponent = (
    <Form
      fields={loginFormFields}
      textSubmitButton={t('boom !')}
      onSubmit={submitHandler}
      message={message}
      messageClass={status}
    />
  );

  const textNoAccount = t('no_account_?');
  const textRegister = t('register_!');
  const textJustPlay = t('just_play_!');

  const actionComponent = (
    <div className="login-page__signup-container">
      <span className="login-page__text-label">{textNoAccount}</span>
      <div className="login-page__link-container">
        <Link to="/registration">
          <GDButton
            className="login-page__link"
            title={textRegister}
            styleOption="secondary"
            size="l"
          />
        </Link>
        <span className="login-page__text-label">{t('or')}</span>
        <Link to="/game">
          <GDButton
            className="login-page__link"
            title={textJustPlay}
            styleOption="secondary"
            size="l"
          />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="page login-page">
      <GDLogo logoImage={logoImage} />
      {formComponent}
      {actionComponent}
    </div>
  );
};
