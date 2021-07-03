import './styles.css';
import React, { FC } from 'react';
import classnames from 'classnames';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import { useTranslation } from 'react-i18next';

export type ModalProps = {
  title: string
  type?: 'info' | 'confirm' | 'y/n' | 'custom'
  onSubmit?: () => void
  onReject?: () => void
  customActions?: {
    actionTitle: string
    callback: () => void
  }[]
  display: string
  setDisplay?: (state: 'active' | 'hidden') => void
  className?: string
}

export const Modal: FC<ModalProps> = ({
  title,
  type = 'info',
  onSubmit,
  onReject,
  customActions,
  display,
  setDisplay,
  className,
}) => {
  const { t } = useTranslation();

  const actionHandler = (callback: (() => void) | undefined) => () => {
    if (callback) {
      callback();
    }
    if (setDisplay) {
      setDisplay('hidden');
    }
  };

  const typeSwitch = () => {
    switch (type) {
      case 'info':
        return (
          <GDButton
            className={classnames('modal__button')}
            title={t('ok')}
            styleOption="secondary"
            size="l"
            onClick={actionHandler(onSubmit)}
          />
        );

      case 'confirm':
        return (
          <>
            <GDButton
              className={classnames('modal__button')}
              title={t('ok')}
              styleOption="secondary"
              size="l"
              onClick={actionHandler(onSubmit)}
            />
            <GDButton
              className={classnames('modal__button')}
              title={t('cancel')}
              styleOption="secondary"
              size="l"
              onClick={actionHandler(onReject)}
            />
          </>
        );

      case 'y/n':
        return (
          <>
            <GDButton
              className={classnames('modal__button')}
              title={t('yes')}
              styleOption="secondary"
              size="l"
              onClick={actionHandler(onSubmit)}
            />
            <GDButton
              className={classnames('modal__button')}
              title={t('no')}
              styleOption="secondary"
              size="l"
              onClick={actionHandler(onReject)}
            />
          </>
        );

      case 'custom':
        return customActions?.map(({ actionTitle, callback }) => (
          <GDButton
            className={classnames('modal__button')}
            title={actionTitle}
            styleOption="secondary"
            size="l"
            onClick={actionHandler(callback)}
          />
        ));

      default: return <></>;
    }
  };

  return (
    <div className={classnames(['modal', `modal__${display}`, className])}>
      <div className="modal__banner">
        <span className="modal__banner-title">{title}</span>
        <div className="modal__options-container">
          {typeSwitch()}
        </div>
      </div>
    </div>
  );
};
