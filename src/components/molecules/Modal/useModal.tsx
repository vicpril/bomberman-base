import { useState } from 'react';
import { TModalType } from 'components/molecules/Modal/types';
import { TModalProps } from 'components/molecules/Modal/Modal';

export const useModal = (props: TModalProps = {}) => {
  const [title, setTitle] = useState(props.title);
  const [display, setDisplay] = useState(props.display);
  const [type, setType] = useState(props.type);

  const hide = () => setDisplay('hidden');

  const show = (newTitle?: string, newType?: TModalType) => {
    if (newTitle) {
      setTitle(newTitle);
    }

    if (newType) {
      setType(newType);
    } else if (type === 'banner') {
      setType('info');
    }

    setDisplay('active');
  };

  return {
    bind: {
      ...props, title, type, display, hide,
    },
    hide,
    show,
  };
};
