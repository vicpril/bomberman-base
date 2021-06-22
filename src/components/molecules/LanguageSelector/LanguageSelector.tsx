import './LanguageSelector.css';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { LanguageString } from './types';

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((lang: LanguageString) => () => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  const renderLanguageButton = useCallback((lang: LanguageString) => (
    <button
      type="button"
      onClick={changeLanguage(lang)}
      className={classNames([
        'language-selector__button',
        { 'language-selector__button_active': i18n.language === lang },
      ])}
    >
      <span>{lang}</span>
    </button>
  ), [i18n, changeLanguage]);

  return (
    <div>
      { renderLanguageButton('en') }
      { renderLanguageButton('ru') }
    </div>
  );
};
