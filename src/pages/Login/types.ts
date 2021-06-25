import { SignInRequest } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type LoginFormFields = {
  [Property in keyof SignInRequest]: GDTextInputProps
}
