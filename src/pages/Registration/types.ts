import { SignUpRequest } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type TRegistrationFormFields = {
  [Property in keyof SignUpRequest]: GDTextInputProps
} & {
  verify_password: GDTextInputProps
}
