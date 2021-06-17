import './Forum.css';
import React, { ChangeEventHandler, FC, useState } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { GDTextInput } from 'components/atoms/GDTextInput/GDTextInput';
import { useTranslation } from 'react-i18next';

export const Forum: FC = () => {
  const { t } = useTranslation();

  // TODO: Delete all showcase functions and state when Forum page is ready
  const [showcaseIsBroken, showcaseSetIsBroken] = useState(false);

  const showcaseButtonClick = (buttonId: number) => () => {
    // eslint-disable-next-line no-console
    console.log(`click ${buttonId}`);
  };

  const showcaseHandleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
  };

  const showcaseHandleInputBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
  };

  const showcaseHandleBreakingEverything = () => {
    showcaseSetIsBroken(true);
  };

  const showcaseRenderingError = () => {
    if (showcaseIsBroken) {
      throw new Error('crash!');
    }
    return <></>;
  };

  return (
    <div>
      {showcaseRenderingError()}

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

        <GDButton
          title={t('break_everything')}
          styleOption="secondary"
          onClick={showcaseHandleBreakingEverything}
          size="m"
        />
      </div>

    </div>
  );
};
