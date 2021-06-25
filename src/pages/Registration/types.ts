/* eslint-disable camelcase */
import { SignUpRequest } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type RefistrationFormFields = {
  [Property in keyof SignUpRequest]: GDTextInputProps
} & {
  verify_password: GDTextInputProps
}
