import './styles.css';
import bombImage from 'assets/images/bomb.png';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';

type ErrorProps = {
  errNumber: number
}

export const Error: FC<ErrorProps> = ({ errNumber }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const backClickHandler = () => {
    history.goBack();
  };

  const errorCanShowBomb = `${errNumber}`[1] === '0' && `${errNumber}`.length > 2;
  return (
    <div className={classNames('error-page')}>

      {errNumber === 404 ? (
        <div className={classNames('error-page-info')}>
          <h2 className={classNames('error-page-info__helptext')}>{t('on_no')}</h2>
          <h1 className={classNames('error-page-info__number')}>
            4
            <img className="error-page-info__bomb-image" src={bombImage} alt="logo" />
            4
          </h1>
          <h2 className={classNames('error-page-info__helptext')}>{t('this_page_was_destroyed')}</h2>
        </div>
      ) : (
        <div className={classNames('error-page-info')}>
          <h2 className={classNames('error-page-info__helptext')}>{t('oops')}</h2>
          <h2 className={classNames('error-page-info__helptext')}>{t('something_went_wrong')}</h2>

          {errorCanShowBomb ? (
            <h1 className={classNames('error-page-info__number')}>
              {`${errNumber}`[0]}
              <img className="error-page-info__bomb-image" src={bombImage} alt="logo" />
              {`${errNumber}`[2]}
            </h1>
          ) : (
            <h1 className={classNames('error-page-info__number')}>{errNumber}</h1>
          )}

          <h2 className={classNames('error-page-info__helptext')}>{t('we_are_looking_to_see_what_happened')}</h2>
        </div>
      )}

      <div className={classNames('error-page__footer')}>
        <GDButton
          title={t('back')}
          styleOption="secondary"
          size="l"
          onClick={backClickHandler}
        />
      </div>
    </div>
  );
};
