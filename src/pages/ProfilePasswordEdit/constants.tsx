import * as Yup from 'yup';
import { TFunction } from 'react-i18next';
import { TPasswordFormFields } from 'pages/ProfilePasswordEdit/types';

export const editProfilePasswordFields: TPasswordFormFields = {
  oldPassword: { id: 'oldPassword', title: 'password', type: 'password' },
  newPassword: { id: 'newPassword', title: 'new_password', type: 'password' },
  verifyPassword: { id: 'verifyPassword', title: 'repeat', type: 'password' },
};

export const validationSchemaConstructor = (t: TFunction) => Yup.object().shape({
  oldPassword: Yup.string()
    .required(t('required'))
    .min(5, t('too_short'))
    .max(15, t('too_long')),
  newPassword: Yup.string()
    .required(t('required'))
    .min(8, t('too_short'))
    .max(25, t('too_long')),
  verifyPassword: Yup.string()
    .required(t('required'))
    .oneOf([Yup.ref('newPassword')], t('passwords_not_matches'))
    .min(8, t('too_short'))
    .max(25, t('too_long')),
});
