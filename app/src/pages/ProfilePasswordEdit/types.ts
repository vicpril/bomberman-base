import { ChangePasswordRequest } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type TPasswordFormFields = {
  [Property in keyof ChangePasswordRequest]: GDTextInputProps
} & {
  verifyPassword: GDTextInputProps
}
