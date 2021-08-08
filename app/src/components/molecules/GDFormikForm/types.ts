import { GDTextInputProps } from 'components/atoms/GDTextInput/GDTextInput';

export type GDFormikFormFields = GDTextInputProps[]
export type TSubmitFormMethod<T> = (data: {[key in keyof T]: string}) => void
