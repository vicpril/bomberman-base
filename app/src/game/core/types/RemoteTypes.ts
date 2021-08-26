import { Movements } from './DirectionsType';

export type RemoteDirection = Movements

// export type PlayerRemoteDirections = Record<RemoteDirection, boolean>

export type PlayerRemoteControls = {
  move: RemoteDirection,
  space: boolean
}

export type PlayerRemoteData = {
  id: string,
  controls: PlayerRemoteControls
}

export type RemoteState = Record<string, PlayerRemoteData>
