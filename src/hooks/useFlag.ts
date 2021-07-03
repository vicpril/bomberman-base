import { useState } from 'react';

export const useFlag = (initiateFlag: boolean) => {
  const [flag, setFlag] = useState(initiateFlag);

  const on = () => setFlag(true);
  const off = () => setFlag(false);
  const toggle = () => (flag ? off() : on());

  return {
    flag, on, off, toggle,
  };
};
