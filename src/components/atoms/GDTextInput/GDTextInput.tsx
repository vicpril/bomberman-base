import './styles.css';
import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import classNames from 'classnames';

export type GDTextInputProps = {
  id: string,
  title: string,
  name?: string,
  type?: string,
  className?: string,
  placeholder?: string,
  value?: string | number,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  onBlur?: FocusEventHandler<HTMLInputElement>,
  onFocus?: FocusEventHandler<HTMLInputElement>,
  isInvalid?: boolean,
}

export const GDTextInput: FC<GDTextInputProps> = ({
  className, placeholder, title, id, type = 'text', value, onChange, onBlur, onFocus, isInvalid,
}) => {
  const titleString = `${title}:`;

  return (
    <label htmlFor={id} className={classNames(isInvalid && 'input-label_invalid', 'input-label')}>
      {titleString}
      <input
        placeholder={placeholder}
        className={classNames('input-field', isInvalid && 'input-field_invalid', className)}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </label>
  );
};
