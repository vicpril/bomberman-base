import './styles.css';
import React, { FC } from 'react';
import classNames from 'classnames';
import { useBoundAction } from 'hooks/useBoundAction';
import { toggleTheme } from 'store/user/userSlice';
import { useSelector } from 'react-redux';
import { selectTheme } from 'store/user/userSelectors';

export const ThemeSwitch: FC = () => {
  const toggleThemeBounded = useBoundAction(toggleTheme);
  const theme = useSelector(selectTheme);
  const checked = theme === 'light';

  return (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames('theme-switcher__switch')}>
      <input defaultChecked={checked} type="checkbox" onClick={() => toggleThemeBounded()} />
      <span className={classNames(['theme-switcher__slider', 'theme-switcher__slider_round'])} />
    </label>
  );
};
