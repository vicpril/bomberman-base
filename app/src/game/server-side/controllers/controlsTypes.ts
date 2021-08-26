export enum KeyTypes {
  UP = 2,
  RIGHT = 3,
  DOWN = 4,
  LEFT = 5,
  SPACE = 6,
}

export type PlayerAction = {
  key: KeyTypes,
  isKeyDown: boolean
}
