import './styles.css';
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { GDLogo } from 'components/atoms/GDLogo/GDLogo';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import logoImage from 'assets/images/logo_img_base.png';
import { useTranslation } from 'react-i18next';
import { loginAsync } from 'store/user/userActions';
import { useBoundAction } from 'hooks/useBoundAction';
import { useSelector } from 'react-redux';
import { getUserState } from 'store/user/userSlice';
import { Modal } from 'components/molecules/Modal/Modal';
import { useModal } from 'components/molecules/Modal/useModal';
import { TSubmitFormMethod } from 'components/molecules/GDFormikForm/types';
import { GDFormikForm } from 'components/molecules/GDFormikForm/GDFormikForm';
import { useMountEffect } from 'hooks/useMountEffect';
import { OAuthController } from 'services/oauth';
import { useApiRequestFactory } from 'hooks/useApiRequestFactory';
import { setIsLoadingShown } from 'store/requestStatus/requestStatusActions';
import { TLoginFormFields } from './types';
import { loginFormFields, validationSchemaConstructor } from './constants';

export const Login: FC = () => {
  const { t } = useTranslation();
  const modal = useModal();
  // 't' в useMemo влияет на правильную работу ssr
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validationSchema = useMemo(() => validationSchemaConstructor(t), []);

  const { error, isLoading } = useSelector(getUserState);
  const loginAsyncBounded = useBoundAction(loginAsync);
  const setIsLoadingBounded = useBoundAction(setIsLoadingShown);

  const submitHandler: TSubmitFormMethod<TLoginFormFields> = async (data) => {
    loginAsyncBounded(data);
  };

  useMemo(() => {
    if (error) {
      modal.show(error.message ?? '');
    } else {
      modal.hide();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoading]);

  const [yandexOAuthUrl, setYandexOauthUrl] = useState('');
  const yandexOAuthText = t('login_with_yandex');

  const {
    request: getOAuthLinkRequest,
    isLoading: isOAuthLoading,
  } = useApiRequestFactory(OAuthController.getOAuthLink);

  useMountEffect(() => {
    getOAuthLinkRequest()
      .then(setYandexOauthUrl);
  });

  useEffect(() => {
    setIsLoadingBounded(isOAuthLoading);
  }, [isOAuthLoading, setIsLoadingBounded]);

  const openNewWindow = (): void => {
    window.location.href = yandexOAuthUrl;
  };

  const textNoAccount = t('no_account_?');
  const textRegister = t('register_!');
  const textJustPlay = t('just_play_!');

  const actionComponent = !isOAuthLoading && (
    <div className="login-page__signup-container">
      <span className="login-page__text-label">{textNoAccount}</span>
      <div className="login-page__link-container">
        <Link to="/registration">
          <GDButton
            className="login-page__link"
            title={textRegister}
            styleOption="secondary"
            size="l"
          />
        </Link>
        <span className="login-page__text-label">{t('or')}</span>
        {yandexOAuthUrl && (
        <GDButton
          className="login-page__link"
          title={yandexOAuthText}
          styleOption="secondary"
          size="l"
          onClick={openNewWindow}
        />
        )}
        <span className="login-page__text-label">{t('or')}</span>
        <Link to="/game">
          <GDButton
            className="login-page__link"
            title={textJustPlay}
            styleOption="secondary"
            size="l"
          />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="page login-page">
      <Modal {...modal.bind} />
      <GDLogo logoImage={logoImage} />
      <GDFormikForm
        fields={Object.values(loginFormFields)}
        validationSchema={validationSchema}
        textSubmitButton={t('submit')}
        onSubmit={submitHandler}
      />
      {actionComponent}
    </div>
  );
};
