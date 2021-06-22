import './styles.css';
import React, { FC } from 'react';
import classNames from 'classnames';

type ThemeSwitchProps = {
  toggleTheme: () => void;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ toggleTheme }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className={classNames('theme-switcher__switch')}>
    <input type="checkbox" onClick={toggleTheme} />
    <span className={classNames(['theme-switcher__slider', 'theme-switcher__slider_round'])} />
  </label>
);
