import './styles.css';
import React, { FC, useMemo } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserState } from 'store/user/userSlice';
import { useBoundAction } from 'hooks/useBoundAction';
import { registerAsync } from 'store/user/userActions';
import { Modal } from 'components/molecules/Modal/Modal';
import { useModal } from 'components/molecules/Modal/useModal';
import { GDFormikForm } from 'components/molecules/GDFormikForm/GDFormikForm';
import { TSubmitFormMethod } from 'components/molecules/GDFormikForm/types';
import { registerFormFields, validationSchemaConstructor } from './constants';
import { TRegistrationFormFields } from './types';

export const Registration: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const modal = useModal();
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validationSchema = useMemo(() => validationSchemaConstructor(t), []);

  const { error, isLoading } = useSelector(getUserState);
  const registerAsyncBounded = useBoundAction(registerAsync);

  const submitHandler: TSubmitFormMethod<TRegistrationFormFields> = async (data) => {
    registerAsyncBounded(data);
  };

  useMemo(() => {
    if (error) {
      modal.show(error.message ?? '');
    } else {
      modal.hide();
    }
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoading, history]);

  const backHandler = () => {
    history.goBack();
  };
  return (
    <div className="page">
      <Modal {...modal.bind} />
      <div className="page__header">
        <h1 className="page__title">{t('registration')}</h1>
      </div>
      <GDFormikForm
        fields={Object.values(registerFormFields)}
        validationSchema={validationSchema}
        textSubmitButton={t('submit')}
        onSubmit={submitHandler}
      />
      <div className="page__footer">
        <GDButton
          className="page__footer-item"
          title="back"
          styleOption="secondary"
          size="l"
          onClick={backHandler}
        />
      </div>
    </div>
  );
};
