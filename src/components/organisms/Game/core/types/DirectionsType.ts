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

export const DIRECTIONS: DirectionType[] = [
  { x: 0, y: -1 }, // up
  { x: 1, y: 0 }, // right
  { x: 0, y: 1 }, // down
  { x: -1, y: 0 }, // left
];
