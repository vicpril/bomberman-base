import React, { FC } from 'react';
import { Error as ErrorComponent } from 'components/organisms/Error/Error';

export const Error: FC = () => (
  <ErrorComponent errNumber={404} />
);
