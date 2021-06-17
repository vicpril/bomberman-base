import './styles.css';
import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';

export type GDButtonProps = {
  title: string
  styleOption: 'primary' | 'secondary'
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  size?: 's' | 'm' | 'l' | 'h',
  type?: 'submit' | 'reset' | 'button';
}

export const GDButton: FC<GDButtonProps> = ({
  title,
  onClick,
  styleOption,
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
