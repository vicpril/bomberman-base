import './Forum.css';
import React, { FC, useCallback } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { GDTextInput } from 'components/atoms/GDTextInput';
import { useTranslation } from 'react-i18next';

export const Forum: FC = () => {
  const { t, i18n } = useTranslation();

  // TODO: Delete all showcase functions when Forum page is ready
  const showcaseButtonClick = useCallback((buttonId: number) => () => {
    // eslint-disable-next-line no-console
    console.log(`click ${buttonId}`);
    i18n.changeLanguage('en');
  }, [i18n]);

  const showcaseHandleInputChange = useCallback((e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
  }, []);

  const showcaseHandleInputBlur = useCallback((e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
  }, []);

  return (
    <div>
      <h1>{t('forum')}</h1>

      <div className={classNames('form-container')}>
        <GDTextInput
          id="login"
          title={t('login')}
          placeholder={t('type_your_login')}
          onChange={showcaseHandleInputChange}
          onBlur={showcaseHandleInputBlur}
        />

        <GDButton
          title={t('submit')}
          styleOption="primary"
          onClick={showcaseButtonClick(1)}
          size="l"
        />

        <GDButton
          title={t('back')}
          styleOption="secondary"
          onClick={showcaseButtonClick(2)}
          size="m"
        />
      </div>

    </div>
  );
};
