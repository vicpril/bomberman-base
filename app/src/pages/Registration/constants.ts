import * as Yup from 'yup';
import { TFunction } from 'react-i18next';
import { TRegistrationFormFields } from './types';

export const registerFormFields: TRegistrationFormFields = {
  login: { id: 'login', title: 'login' },
  email: { id: 'email', title: 'e-mail', type: 'email' },
  first_name: { id: 'first_name', title: 'first_name' },
  second_name: { id: 'second_name', title: 'last_name' },
  phone: { id: 'phone', title: 'phone', type: 'tel' },
  password: { id: 'password', title: 'password', type: 'password' },
  verify_password: { id: 'verify_password', title: 'repeat', type: 'password' },
};

// eslint-disable-next-line max-len
const phoneRegExp = /^((\+[1-9]{1,4}[\\-]*)|(\([0-9]{2,3}\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[\\-]*[0-9]{3,4}?$/;

export const validationSchemaConstructor = (t: TFunction) => Yup.object().shape({
  login: Yup.string()
    .required(t('required'))
    .min(5, t('too_short'))
    .max(15, t('too_long')),
  email: Yup.string()
    .required(t('required'))
    .email(t('invalid_format')),
  first_name: Yup.string()
    .typeError(t('letters_only'))
    .required(t('required'))
    .max(25, t('too_long')),
  second_name: Yup.string()
    .typeError(t('letters_only'))
    .required(t('required'))
    .max(25, t('too_long')),
  phone: Yup.string()
    .required(t('required'))
    .matches(phoneRegExp, t('invalid_format')),
  password: Yup.string()
    .required(t('required'))
    .min(8, t('too_short'))
    .max(25, t('too_long')),
  verify_password: Yup.string()
    .required(t('required'))
    .oneOf([Yup.ref('password')], t('passwords_not_matches'))
    .min(8, t('too_short'))
    .max(25, t('too_long')),
});
