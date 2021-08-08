import * as Yup from 'yup';
import { TFunction } from 'react-i18next';
import { TProfileFormFields } from 'pages/ProfileEdit/types';

export const editProfileFormFields: TProfileFormFields = {
  first_name: { id: 'first_name', title: 'name' },
  second_name: { id: 'second_name', title: 'last_name' },
  display_name: { id: 'display_name', title: 'nickname' },
  email: { id: 'email', title: 'e-mail', type: 'email' },
  phone: { id: 'phone', title: 'phone', type: 'tel' },
};

export const validationSchemaConstructor = (t: TFunction) => Yup.object().shape({
  first_name: Yup.string()
    .typeError(t('letters_only'))
    .required(t('required'))
    .max(25, t('too_long')),
  email: Yup.string()
    .required(t('required'))
    .email(t('invalid_format')),
  second_name: Yup.string()
    .typeError(t('letters_only'))
    .required(t('required'))
    .max(25, t('too_long')),
  display_name: Yup.string()
    .max(25, t('too_long')),
  phone: Yup.string()
    .required(t('required')),
});
