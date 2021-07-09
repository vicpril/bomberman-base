import './styles.css';
import React, { FC, useMemo, useState } from 'react';
import { FormikValues, useFormik } from 'formik';
import { GDTextInput } from 'components/atoms/GDTextInput/GDTextInput';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classnames from 'classnames';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { GDFormikFormFields, TSubmitFormMethod } from './types';

type GDFormikFormProps = {
  fields: GDFormikFormFields
  validationSchema: yup.ObjectSchema<any>
  initialValues?: FormikValues
  textSubmitButton?: string,
  onSubmit: TSubmitFormMethod<any>
}

export const GDFormikForm: FC<GDFormikFormProps> = ({
  fields,
  initialValues,
  validationSchema,
  textSubmitButton = 'submit',
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [activeInputID, setActiveInputID] = useState('');
  const initial = useMemo(() => initialValues || fields.reduce((values: FormikValues, field) => {
    values[field.id] = '';
    return values;
  }, {}), [fields, initialValues]);

  const formik = useFormik({
    initialValues: initial,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit,
    validationSchema: () => validationSchema,
    enableReinitialize: true,
  });

  return (
    <form className={classnames('form')} onSubmit={formik.handleSubmit}>
      {fields.map(({
        id, title, type, placeholder, className,
      }) => (
        <GDTextInput
          id={id}
          title={t(title)}
          type={type}
          placeholder={placeholder}
          value={formik.values[id]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={className}
          isInvalid={!!(formik.touched[id] && formik.errors[id] && !formik.isValid)}
          onFocus={(event) => setActiveInputID(event.target.id)}
          key={id}
        />
      ))}
      <p className="form__error-label">{formik.touched[activeInputID] && formik.errors[activeInputID]}</p>
      <GDButton
        className="form__submit-button"
        title={textSubmitButton}
        styleOption="primary"
        size="l"
        type="submit"
      />
    </form>
  );
};
