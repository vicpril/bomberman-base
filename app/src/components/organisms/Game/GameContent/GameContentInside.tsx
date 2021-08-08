import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';

type GameContentInsideProps = {
  text?: string,
  buttonText?: string,
  onButtonClick?: () => void
}
export const GameContentInside:
  FC<GameContentInsideProps> = ({ text, buttonText, onButtonClick }) => {
    const p = text ? <p>{ text }</p> : '';
    const button = buttonText ? (
      <GDButton
        title={buttonText}
        size="m"
        onClick={onButtonClick}
      />
    ) : '';

    return (
      <>
        {p}
        {button}
      </>
    );
  };
