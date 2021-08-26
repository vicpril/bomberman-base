import { FrameActions, FrameEntities, Frames } from './SpriteTypes';

export const PLAYER_FRAMES: Partial<Record<FrameEntities, Frames>> = {
  [FrameEntities.PLAYER]: {
    [FrameActions.UP]: {
      0: [0, 1],
      1: [1, 1],
      2: [2, 1],
      3: [3, 1],
      4: [4, 1],
      5: [5, 1],
    },
    [FrameActions.RIGHT]: {
      0: [6, 0],
      1: [7, 0],
      2: [8, 0],
      3: [9, 0],
      4: [10, 0],
      5: [11, 0],
    },
    [FrameActions.DOWN]: {
      0: [0, 0],
      1: [1, 0],
      2: [2, 0],
      3: [3, 0],
      4: [4, 0],
      5: [5, 0],
    },
    [FrameActions.LEFT]: {
      0: [6, 1],
      1: [7, 1],
      2: [8, 1],
      3: [9, 1],
      4: [10, 1],
      5: [11, 1],
    },
  },
};
