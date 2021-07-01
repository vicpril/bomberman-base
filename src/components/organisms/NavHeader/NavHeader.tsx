import './styles.css';
import classNames from 'classnames';
import React, { FC } from 'react';
import { LanguageSelector } from 'components/molecules/LanguageSelector/LanguageSelector';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeSwitch } from 'components/molecules/ThemeSwitch/ThemeSwitch';

export const NavHeader: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={classNames('nav-header')}>
      <ThemeSwitch />

      <div>
        <Link
          to="/"
          className={classNames('nav-header__link', { 'nav-header__link_active': pathname === '/' })}
        >
          {t('main')}
        </Link>

        <Link
          to="/game"
          className={classNames('nav-header__link', { 'nav-header__link_active': pathname === '/game' })}
        >
          {t('game')}
        </Link>

        <Link
          to="/forum"
          className={classNames('nav-header__link', { 'nav-header__link_active': pathname === '/forum' })}
        >
          {t('forum')}
        </Link>

        <Link
          to="/leaderboard"
          className={classNames('nav-header__link', { 'nav-header__link_active': pathname === '/leaderboard' })}
        >
          {t('leaderboard')}
        </Link>

        <Link
          to="/profile"
          className={classNames('nav-header__link', { 'nav-header__link_active': pathname === '/profile' })}
        >
          {t('profile')}
        </Link>
      </div>

      <LanguageSelector />
    </div>
  );
};
