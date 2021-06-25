import './styles.css';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GDLogo } from 'components/atoms/GDLogo/GDLogo';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { Form } from 'components/molecules/Form/Form';
import logoImage from 'assets/images/logo_img_base.png';
import { useTranslation } from 'react-i18next';
import { FormMessageStatus, SubmitFormMethod } from 'components/molecules/Form/types';
import { authAPI } from 'api/auth';
import { useApiRequestFactory } from 'utils/api-factory';
import { useMountEffect } from 'utils/useMountEffect';
import { LoginFormFields } from './types';
import { loginFormFields } from './constants';

export const Login: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  useMountEffect(() => {
    if (authAPI.isAuth()) {
      history.replace('/');
    }
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { request: login } = useApiRequestFactory(authAPI.login);

  const submitHandler: SubmitFormMethod<LoginFormFields> = async (data) => {
    try {
      await login(data);
      setErrorMessage('');
      // TODO store user
      history.replace('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const formComponent = (
    <Form
      fields={loginFormFields}
      textSubmitButton={t('boom !')}
      onSubmit={submitHandler}
      message={errorMessage}
      messageClass={FormMessageStatus.error}
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
