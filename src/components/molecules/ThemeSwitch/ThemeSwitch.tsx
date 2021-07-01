import './styles.css';
import React, { FC } from 'react';
import classNames from 'classnames';
import { useBoundAction } from 'hooks/useBoundAction';
import { toggleTheme } from 'redux/user/userSlice';

export const ThemeSwitch: FC = () => {
  const toggleThemeBounded = useBoundAction(toggleTheme);

  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames('theme-switcher__switch')}>
      <input type="checkbox" onClick={toggleThemeBounded} />
      <span className={classNames(['theme-switcher__slider', 'theme-switcher__slider_round'])} />
    </label>
  );
};
