/* eslint-disable camelcase */
import { UserResponse } from 'api/types';
import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type ProfileFormFields = {
  [Property in keyof UserResponse]?: GDTextInputProps
}

export type SubmitedProfileData = Pick<UserResponse, 'first_name' | 'second_name' | 'email' | 'phone' | 'display_name'>
