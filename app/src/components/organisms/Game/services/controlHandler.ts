import { socket } from 'game/core/services/socketService';
import { KeyTypes, PlayerAction } from 'game/server-side/controllers/controlsTypes';

const sendActionRequest = (action: PlayerAction) => {
  socket.emit('player/action', action);
};

const keysSet = new Set();

const handlerKeyEvent = (event: KeyboardEvent, isKeyDown: boolean) => {
  if (isKeyDown) {
    if (keysSet.has(event.key)) {
      return;
    }
    keysSet.add(event.key);
  } else {
    keysSet.delete(event.key);
  }

  if (event.key === 'ArrowUp') {
    sendActionRequest({ key: KeyTypes.UP, isKeyDown });
  } else if (event.key === 'ArrowDown') {
    sendActionRequest({ key: KeyTypes.DOWN, isKeyDown });
  } else if (event.key === 'ArrowRight') {
    sendActionRequest({ key: KeyTypes.RIGHT, isKeyDown });
  } else if (event.key === 'ArrowLeft') {
    sendActionRequest({ key: KeyTypes.LEFT, isKeyDown });
  } else if (event.key === ' ') {
    sendActionRequest({ key: KeyTypes.SPACE, isKeyDown });
  }
};

const handlerKeydownEvent = (event: KeyboardEvent) => {
  handlerKeyEvent(event, true);
};

const handlerKeyupEvent = (event: KeyboardEvent) => {
  handlerKeyEvent(event, false);
};

const addControlListener = () => {
  document.addEventListener('keydown', handlerKeydownEvent);
  document.addEventListener('keyup', handlerKeyupEvent);
};

const removeControlListener = () => {
  document.removeEventListener('keydown', handlerKeydownEvent);
  document.removeEventListener('keyup', handlerKeyupEvent);
};

export {
  addControlListener,
  removeControlListener,
};
