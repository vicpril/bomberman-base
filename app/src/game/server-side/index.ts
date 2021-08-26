import { GameStatus } from 'game/core/classes/Game';
import http, { Server } from 'http';
import { Server as ServerIO, Socket } from 'socket.io';
import express from 'express';
import { store } from './store';
import { routes } from './routes';

export const createServerIo = (server: Server) => {
  const serverIo = new ServerIO(server, {
    cors: {
      origin: 'http://localhost:5000',
      methods: ['GET'],
      credentials: true,
    },
  });

  serverIo.on('connection', (socket: Socket) => {
    routes.forEach((route) => {
      socket.on(route.name, route.controller(socket));
    });
  });

  setInterval(() => {
    store.rooms.players.forEach((room, socketId) => {
      if (room.game.status.get() === GameStatus.IN_PROGRESS) {
        const data = room.game.exportData(room.playersId.findIndex((id) => id === socketId));
        serverIo.to(socketId).emit('state', data);
      }
    });
  }, 1000 / 50);

  return {
    io: serverIo,
  };
};

const app = express();

const server = http.createServer(app);

export const { io } = createServerIo(server);

const port = 5001;

export const startServer = async () => {
  server.listen(port, () => {
  // eslint-disable-next-line no-console
    console.log('Sockets is started on localhost:', port);
  });
};
