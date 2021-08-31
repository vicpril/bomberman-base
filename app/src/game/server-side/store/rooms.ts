import { GameStatus } from 'game/core/classes/Game';
import { io } from 'game/server-side';
import { Room } from '../../core/classes/Room';

export const RoomsController = () => {
  let rooms: Room[] = [];

  const removeRoom = (id: string) => {
    rooms = rooms.filter((r) => r.id !== id);
  };

  const findEmptyRoom = () => rooms.find((room) => !room.isFull && !room.isClosed);

  const players = new Map<string, Room>();

  const emitWaitinaAPlayer = (socketId: string, currentRoom: Room) => {
    io.to(socketId).emit('game:waiting-player');
    io.to(socketId).emit('state',
      currentRoom.game.exportData(currentRoom.playersId.findIndex((id) => id === socketId)));
    currentRoom.game.status.set(GameStatus.WAITING_PLAYER);
  };

  const emitGameStarting = (socketId: string, currentRoom: Room) => {
    const targetSockets = players.get(socketId)?.playersId ?? [];
    io.to(targetSockets).emit('game:starting');
    io.to(targetSockets).emit('state',
      currentRoom.game.exportData(currentRoom.playersId.findIndex((id) => id === socketId)));
    currentRoom.game.status.set(GameStatus.IN_PROGRESS);
  };

  const addPlayer = (id: string) => {
    const emptyRoom = findEmptyRoom();

    if (emptyRoom) {
      emptyRoom.addPlayer(id);
      players.set(id, emptyRoom);
      emptyRoom.game.addSecondPlayer(id);
      emptyRoom.game.startGame();
      emitGameStarting(id, emptyRoom);
    } else {
      const newRoom = new Room();
      newRoom.addPlayer(id);
      newRoom.game.addFirstPlayer(id);
      rooms.push(newRoom);
      players.set(id, newRoom);

      emitWaitinaAPlayer(id, newRoom);
    }
  };

  const findRoomByPlayerId = (playerId: string) => players.get(playerId) ?? null;

  const removePlayer = (playerId: string): string[] => {
    const room = findRoomByPlayerId(playerId);
    room?.removePlayer(playerId);
    if (room?.size === 0) {
      removeRoom(room.id);
    }
    players.delete(playerId);

    return room?.playersId ?? [];
  };

  return {
    rooms,
    players,
    addPlayer,
    removePlayer,
  };
};
