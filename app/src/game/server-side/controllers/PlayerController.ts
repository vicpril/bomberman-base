import { Movements } from 'game/core/types/DirectionsType';
import { io } from 'game/server-side';
import { Socket } from 'socket.io';
import { store } from '../store';
import { KeyTypes, PlayerAction } from './controlsTypes';

export const PlayerController = {

  connect: (socket: Socket) => () => {
    try {
      store.rooms.addPlayer(socket.id);
      io.emit('player:connected-success', socket.id);
      console.log('~ player:connected-success', socket.id);
    } catch (error) {
      io.emit('player:connected-error', socket.id);
      console.log('~ player:connected-error', socket.id);
      console.log('~ error', error);
    }
  },

  socketDisconnect: (socket: Socket) => (reason: string) => {
    const otherSocketsInRoom = store.rooms.removePlayer(socket.id);
    otherSocketsInRoom.forEach((socketId) => {
      io.to(socketId).emit('player:disconnected', socket.id);
    });
    console.log('~ player:disconnected', socket.id, reason);
  },

  action: (socket: Socket) => ({ key, isKeyDown }: PlayerAction) => {
    const room = store.rooms.players.get(socket.id);
    if (room) {
      const player = room.game.BF.findPlayerById(socket.id);
      if (key !== KeyTypes.SPACE) {
        if (isKeyDown) {
          switch (key) {
            case KeyTypes.UP: player?.moveOn(Movements.UP); break;
            case KeyTypes.RIGHT: player?.moveOn(Movements.RIGHT); break;
            case KeyTypes.DOWN: player?.moveOn(Movements.DOWN); break;
            case KeyTypes.LEFT: player?.moveOn(Movements.LEFT); break;
            default: player?.moveOn(Movements.NONE); break;
          }
        } else {
          player?.moveOff();
        }
      } else {
        player?.placeBomb();
      }
    }
  },

};
