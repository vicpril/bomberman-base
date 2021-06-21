import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { Form } from 'components/molecules/Form/Form';
import { editProfilePasswordFields } from 'pages/ProfilePasswordEdit/constants';

export type ProfilePasswordPageProps = {
  className?: string
}

export const ProfilePasswordEdit: FC<ProfilePasswordPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const submitHandler = () => console.log('Password edit form submitted');
  const formFields = editProfilePasswordFields.map(({ id, type, title }) => {
    return { id, type, title: t(title) };
  });

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('password_edit')}</h1>

      <div className="page__content">
        <Form fields={formFields} />
        <GDButton title={t('submit')} styleOption="primary" onClick={submitHandler} />
      </div>

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
