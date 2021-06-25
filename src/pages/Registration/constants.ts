import { RefistrationFormFields } from './types';

export const registerFormFields: RefistrationFormFields = {
  login: { id: 'login', title: 'login' },
  email: { id: 'email', title: 'e-mail', type: 'email' },
  first_name: { id: 'first_name', title: 'first name' },
  second_name: { id: 'second_name', title: 'last name' },
  phone: { id: 'phone', title: 'phone', type: 'tel' },
  password: { id: 'password', title: 'password', type: 'password' },
  verify_password: { id: 'verify_password', title: 'repeat', type: 'password' },
};
