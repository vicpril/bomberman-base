import './styles.css';
import React, { FC } from 'react';

type GDLogoProps = {
  logoImage: string
}

export const GDLogo: FC<GDLogoProps> = ({ logoImage }) => (
  <div className="logo">
    <span className="logo__text logo__text_big">
      B
      <img className="logo__image" src={logoImage} alt="logo" />
      MB
    </span>
    <span className="logo__text logo__text_small">ATTACK</span>
  </div>
);
