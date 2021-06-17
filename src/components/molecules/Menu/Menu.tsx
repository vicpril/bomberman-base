import './styles.css';
import React, { FC } from 'react';
import { GDButton, GDButtonProps } from 'components/atoms/GDButton';
import classnames from 'classnames';

// TODO: вынести типы size и styleOption
export type MenuProps = {
  items: Pick<GDButtonProps, 'title' | 'onClick'>[]
  itemsStyleOption: 'primary' | 'secondary'
  itemsSize?: 's' | 'm' | 'l' | 'h',
  itemsClassName?: string
  className?: string
}

export const Menu: FC<MenuProps> = ({
  items,
  itemsClassName,
  itemsStyleOption,
  itemsSize,
  className,
}) => (
  <div className={classnames(['menu', className])}>
    {items.map(({ title, onClick }) => (
      <GDButton
        className={itemsClassName}
        title={title}
        size={itemsSize}
        styleOption={itemsStyleOption}
        onClick={onClick}
      />
    ))}
  </div>
);
