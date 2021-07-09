import { UserResponse } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type TProfileFormFields = {
  [Property in keyof UserResponse]?: GDTextInputProps
}
