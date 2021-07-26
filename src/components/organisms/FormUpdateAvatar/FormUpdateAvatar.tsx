import classNames from 'classnames';
import { useBoundAction } from 'hooks/useBoundAction';
import React, { ChangeEventHandler, FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { changeAvatarAsync } from 'store/user/userActions';

export const FormUpdateAvatar: FC = () => {
  const { t } = useTranslation();

  const changeAvatarAsyncBounded = useBoundAction(changeAvatarAsync);

  const formAvatar = useRef<HTMLFormElement>(null);

  const changeAvatarHandler: ChangeEventHandler<HTMLInputElement> = async () => {
    if (formAvatar?.current) {
      const formData = new FormData(formAvatar.current);
      changeAvatarAsyncBounded(formData);
    }
  };

  return (
    <form ref={formAvatar}>
      <label
        htmlFor="avatar"
        className={classNames(['btn', 'btn-secondary', 'size_l', 'profile__upload_avatar__label'])}
      >
        {t('upload_avatar')}
        <input type="file" name="avatar" id="avatar" onChange={changeAvatarHandler} />
      </label>
    </form>

  );
};
