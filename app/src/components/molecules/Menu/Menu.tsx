import React, { FC } from 'react';
import { GDButton, GDButtonProps } from 'components/atoms/GDButton/GDButton';
import classnames from 'classnames';
import { GDButtonStyleOption, GDSizeOption } from 'components/organisms/App/types';

export type MenuProps = {
  items: Pick<GDButtonProps, 'title' | 'onClick'>[]
  itemsStyleOption: GDButtonStyleOption
  itemsSize?: GDSizeOption
  itemsClassName?: string
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export const Menu: FC<MenuProps> = ({
  items,
  itemsClassName,
  itemsStyleOption,
  itemsSize = 'l',
  direction = 'vertical',
  className,
}) => (
  <div className={classnames(['menu', `menu-${direction}`, className])}>
    {items.map(({ title, onClick }) => (
      <GDButton
        className={classnames(['menu__item', itemsClassName])}
        title={title}
        size={itemsSize}
        styleOption={itemsStyleOption}
        onClick={onClick}
        key={title}
      />
    ))}
  </div>
);
