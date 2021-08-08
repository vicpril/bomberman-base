import { SignInRequest } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type TLoginFormFields = {
  [Property in keyof SignInRequest]: GDTextInputProps
}
