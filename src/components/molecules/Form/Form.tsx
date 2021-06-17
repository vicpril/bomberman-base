import './styles.css';
import React, { FC } from 'react';
import { GDTextInput, GDTextInputProps } from 'components/atoms/GDTextInput';
import classnames from 'classnames';

type FormProps = {
  fields: GDTextInputProps[]
  className?: string
}

export const Form: FC<FormProps> = ({ fields, className }) => (
  <form className={classnames(['form', className])}>
    {fields.map(({ id, title }) => <GDTextInput id={id} title={title} />)}
    <span className="form__error-label">validation error !</span>
  </form>
);
