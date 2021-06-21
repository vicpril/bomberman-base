import './styles.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { Form } from 'components/molecules/Form/Form';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';

const loginFormFields = [
  { id: 'first_name', title: 'name' },
  { id: 'second_name', title: 'last_name' },
  { id: 'email', title: 'e-mail', type: 'email' },
  { id: 'phone', title: 'phone', type: 'tel' },
  { id: 'login', title: 'login' },
  { id: 'password', title: 'password', type: 'password' },
  { id: 'verify_password', title: 'repeat', type: 'password' },
];

export type RegistrationPageProps = {
  className?: string
}

export const Registration: FC<RegistrationPageProps> = ({ className }) => {
  const { t } = useTranslation();

  loginFormFields.forEach((field) => {
    field.title = t(field.title);
  });

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('registration')}</h1>
      <Form className="register-form" fields={loginFormFields} />
      <GDButton
        title={t('submit')}
        styleOption="primary"
        size="l"
        onClick={() => null}
      />

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
