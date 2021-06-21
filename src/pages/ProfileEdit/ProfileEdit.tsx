import React, { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { Form } from 'components/molecules/Form/Form';
import { Menu } from 'components/molecules/Menu/Menu';
import { useHistory } from 'react-router-dom';
import { editProfileFields } from 'pages/ProfileEdit/constants';

export type ProfileEditPageProps = {
  className?: string
}

export const ProfileEdit: FC<ProfileEditPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const editProfileMenuItems = [
    { title: 'remove_avatar', onClick: () => null },
    { title: 'upload_avatar', onClick: () => null },
    { title: 'change_password', onClick: () => history.push('/profile-password-edit') },
  ];

  const formFields = editProfileFields.map(({ id, title }) => ({ id, title: t(title) }));

  editProfileMenuItems.forEach((item) => {
    item.title = t(item.title);
  });

  const submitHandler = () => console.log('Password edit form submitted');

  return (
    <div className={classnames(['page', className])}>
      <h1 className="page__title">{t('profile_edit')}</h1>

      <div className="page__content">
        <Form fields={formFields} />
        <Menu items={editProfileMenuItems} itemsStyleOption="secondary" />
        <GDButton title={t('submit')} styleOption="primary" onClick={submitHandler} />
      </div>

      <div className="page__footer-buttons">
        <BackButton />
      </div>
    </div>
  );
};
