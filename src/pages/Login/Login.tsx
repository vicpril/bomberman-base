import './styles.css';
import React, { FC } from 'react';
import { GDLogo } from 'components/atoms/GDLogo';
import { GDButton } from 'components/atoms/GDButton';
import { Form } from 'components/molecules/Form';
import logoImage from 'assets/images/logo_img_base.png';

const loginFormFields = [
  { id: 'login', title: 'login' },
  { id: 'password', title: 'password' },
];

export const Login: FC = () => (
  <div className="page login-page">
    <GDLogo logoImage={logoImage} />
    <Form fields={loginFormFields} />
    <GDButton
      className="login-page__button"
      title="boom !"
      styleOption="primary"
      size="l"
      type="submit"
      onClick={() => null}
    />
    <div className="login-page__signup-container">
      <span className="login-page__text-label">no account ?</span>
      <div className="login-page__link-container">
        <GDButton
          className="login-page__link"
          title="register !"
          styleOption="secondary"
          size="l"
          onClick={() => null}
        />
        <span className="login-page__text-label">or</span>
        <GDButton
          className="login-page__link"
          title="just play !"
          styleOption="secondary"
          size="l"
          onClick={() => null}
        />
      </div>
    </div>
  </div>
);
