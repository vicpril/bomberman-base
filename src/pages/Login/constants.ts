import { TFunction } from 'react-i18next';
import * as Yup from 'yup';
import { TLoginFormFields } from './types';

export const loginFormFields: TLoginFormFields = {
  login: { id: 'login', title: 'login' },
  password: { id: 'password', title: 'password', type: 'password' },
};

export const validationSchemaConstructor = (t: TFunction) => Yup.object().shape({
  login: Yup.string().required(t('required')),
  password: Yup.string().required(t('required')),
});
