import './styles.css';
import React, {
  ChangeEventHandler, FC, FormEventHandler, useMemo,
} from 'react';
import { UserResponse } from 'api/types';
import classNames from 'classnames';
import { GDTextInput } from 'components/atoms/GDTextInput/GDTextInput';
import { useTranslation } from 'react-i18next';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { getFormData } from 'utils/getFormData';
import { FormMessageStatus } from 'components/molecules/Form/types';
import { SubmitedProfileData } from './types';
import { profileFields as fields } from './constants';

type FormProfileProps = {
  user: UserResponse
  onChangeInput: (key: string) => ChangeEventHandler<HTMLInputElement>,
  onSubmit: (data: SubmitedProfileData) => void,
  message?: string,
  messageClass?: FormMessageStatus,
  isLoading?: boolean
}

export const FormProfile: FC<FormProfileProps> = ({
  onChangeInput, onSubmit, user, message, messageClass = FormMessageStatus.default,
}) => {
  const { t } = useTranslation();

  const messageComp = (
    <p
      className={classNames(['form__label', `form__label__${messageClass}`, { hidden: !message }])}
    >
      {message || 'hidden'}
    </p>
  );

  const submitButton = (
    <GDButton
      className="form_submit__button"
      title={t('save')}
      styleOption="primary"
      size="m"
      type="submit"
    />
  );

  const submitHandler: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    if (onSubmit) {
      const form = new FormData(e.target as HTMLFormElement);
      const formValues = getFormData(form);
      onSubmit(formValues as SubmitedProfileData);
    }
  };

  const inputList = useMemo(() => fields.map((key) => (
    <GDTextInput
      id={key}
      title={t(key)}
      name={key}
      value={user[key as keyof UserResponse] ?? ''}
      onChange={onChangeInput(key)}
      key={key}
    />
  )), [onChangeInput, t, user]);

  return (
    <form
      className={classNames(['form', 'profile-form'])}
      onSubmit={submitHandler}
    >
      {inputList}
      {messageComp}
      {submitButton}
    </form>
  );
};
