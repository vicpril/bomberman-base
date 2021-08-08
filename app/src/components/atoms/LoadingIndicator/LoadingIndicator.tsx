import './styles.css';
import React, { FC } from 'react';
import classNames from 'classnames';
import bombImage from 'assets/images/bomb.png';
import { useSelector } from 'react-redux';
import { selectIsLoadingShown } from 'store/requestStatus/requestStatusSelectors';

export const LoadingIndicator: FC = () => {
  const isLoadingShown = useSelector(selectIsLoadingShown);

  return (
    isLoadingShown
      ? (
        <div className={classNames('loading-indicator')}>
          <img className={classNames(['loading-indicator__image', 'rotating'])} src={bombImage} alt="bomb" />
        </div>
      ) : null
  );
};
