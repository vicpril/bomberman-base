import './styles.css';
import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { GDButtonStyleOption, GDSizeOption } from 'components/organisms/App/types';

export type GDButtonProps = {
  title: string
  styleOption?: GDButtonStyleOption
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  size?: GDSizeOption
  type?: 'submit' | 'reset' | 'button'
}

export const GDButton: FC<GDButtonProps> = ({
  title,
  onClick,
  styleOption = 'primary',
  className,
  size = 'm',
  type = 'button',
}) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames(['btn', `btn-${styleOption}`, `size_${size}`, className])}
  >
    {title}
  </button>
);
