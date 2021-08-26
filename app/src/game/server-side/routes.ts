import { Socket } from 'socket.io';
import { PlayerController } from './controllers/PlayerController';

type SocketsRoute = {
  name: string,
  controller: (socket: Socket) => (data: any) => void
}
type SocketsRoutes = SocketsRoute[]

export const routes: SocketsRoutes = [
  { name: 'disconnect', controller: PlayerController.socketDisconnect },
  { name: 'player/connect', controller: PlayerController.connect },
  { name: 'player/disconnect', controller: PlayerController.socketDisconnect },
  { name: 'player/action', controller: PlayerController.action },

];
