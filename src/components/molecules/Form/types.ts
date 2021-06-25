import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type FormFields = Record<string, GDTextInputProps>

export type SubmitFormMethod<T> = (data: {[key in keyof T]: string}) => void

export enum FormMessageStatus {
  success = 'success',
  error = 'error',
  warning = 'warning',
  default = 'default'
}
