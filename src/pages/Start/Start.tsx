import './styles.css';
import React, { FC } from 'react';
import logoImage from 'assets/images/logo_img_base.png';
import { GDLogo } from 'components/atoms/GDLogo';
import { GDButton } from 'components/atoms/GDButton';
import { Menu } from 'components/molecules/Menu/Menu';

const items = [
  { title: 'settings', onClick: () => null },
  { title: 'profile', onClick: () => null },
  { title: 'leaderboard', onClick: () => null },
  { title: 'forum', onClick: () => null },
];

export const Start: FC = () => (
  <div className="page start-page">
    <GDLogo logoImage={logoImage} />
    <GDButton
      className="main-font-family"
      title="play !"
      size="h"
      styleOption="secondary"
      onClick={() => null}
    />
    <Menu
      className="start-page__menu"
      items={items}
      itemsStyleOption="secondary"
      itemsSize="l"
      itemsClassName="start-page__menu-item"
    />
    <GDButton
      className="main-font-family"
      title="logout"
      styleOption="secondary"
      size="l"
      onClick={() => null}
    />
  </div>
);
