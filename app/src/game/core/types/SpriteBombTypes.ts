import { FrameActions, FrameEntities, Frames } from './SpriteTypes';

export const BOMB_FRAMES: Partial<Record<FrameEntities, Frames>> = {
  [FrameEntities.BOMB]: {
    [FrameActions.PERMANENT]: {
      0: [0, 0],
      1: [1, 0],
      2: [2, 0],
      3: [3, 0],
    },
  },
};
