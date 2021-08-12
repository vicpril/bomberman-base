export enum Movements {
  NONE, UP, RIGHT, DOWN, LEFT
}

/**
 *        0 -1
 *
 * -1 0   0 0   1 0
 *
 *        0 1
 */
export type DirectionType = {
  x: 0 | 1 | -1;
  y: 0 | 1 | -1;
};

export const DIRECTIONS: Record<Movements, DirectionType> = {
  [Movements.NONE]: { x: 0, y: 0 }, // stay
  [Movements.UP]: { x: 0, y: -1 }, // up
  [Movements.RIGHT]: { x: 1, y: 0 }, // right
  [Movements.DOWN]: { x: 0, y: 1 }, // down
  [Movements.LEFT]: { x: -1, y: 0 }, // left
};

export const defineDirection = (o: DirectionType): Movements => {
  if (o.x === 0 && o.y === -1) {
    return Movements.UP;
  } if (o.x === 1 && o.y === 0) {
    return Movements.RIGHT;
  } if (o.x === 0 && o.y === 1) {
    return Movements.DOWN;
  } if (o.x === -1 && o.y === 0) {
    return Movements.LEFT;
  }
  return Movements.NONE;
};
