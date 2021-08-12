type SpriteCoord = [number, number]

type Sprite = {
  [frame: number]: SpriteCoord
}

export type Frames = Partial<Record<FrameActions, Sprite>>

export enum FrameEntities {
  BOMB,
  PLAYER,
  EXPLOSION_CENTER,
  EXPLOSION_MIDDLE,
  EXPLOSION_END,
}

export enum FrameActions {
  PERMANENT,
  UP,
  RIGHT,
  DOWN,
  LEFT,
  BLOW,
}

export const FRAMES: Partial<Record<FrameEntities, Frames>> = {
  [FrameEntities.BOMB]: {
    [FrameActions.PERMANENT]: {
      0: [0, 3],
      1: [1, 3],
      2: [2, 3],
      3: [1, 3],
    },
  },
  [FrameEntities.PLAYER]: {
    [FrameActions.UP]: {
      0: [3, 1],
      1: [4, 1],
      2: [5, 1],
      3: [4, 1],
    },
    [FrameActions.RIGHT]: {
      0: [0, 1],
      1: [1, 1],
      2: [2, 1],
      3: [1, 1],
    },
    [FrameActions.DOWN]: {
      0: [3, 0],
      1: [4, 0],
      2: [5, 0],
      3: [4, 0],
    },
    [FrameActions.LEFT]: {
      0: [0, 0],
      1: [1, 0],
      2: [2, 0],
      3: [1, 0],
    },
    [FrameActions.BLOW]: {
      0: [0, 2],
      1: [1, 2],
      2: [2, 2],
      3: [3, 2],
      4: [4, 2],
      5: [5, 2],
      6: [6, 2],
    },
  },
  [FrameEntities.EXPLOSION_CENTER]: {
    [FrameActions.PERMANENT]: {
      0: [2, 6],
      1: [7, 6],
      2: [2, 11],
      3: [7, 11],
      4: [2, 11],
      5: [7, 6],
    },
  },
  [FrameEntities.EXPLOSION_MIDDLE]: {
    [FrameActions.UP]: {
      0: [2, 5],
      1: [7, 5],
      2: [2, 10],
      3: [7, 10],
      4: [2, 10],
      5: [7, 5],
    },
    [FrameActions.RIGHT]: {
      0: [3, 6],
      1: [8, 6],
      2: [3, 11],
      3: [8, 11],
      4: [3, 11],
      5: [8, 6],
    },
    [FrameActions.DOWN]: {
      0: [2, 7],
      1: [7, 7],
      2: [2, 12],
      3: [7, 12],
      4: [2, 12],
      5: [7, 7],
    },
    [FrameActions.LEFT]: {
      0: [1, 6],
      1: [6, 6],
      2: [1, 11],
      3: [6, 11],
      4: [1, 11],
      5: [6, 6],
    },
  },
  [FrameEntities.EXPLOSION_END]: {
    [FrameActions.UP]: {
      0: [2, 4],
      1: [7, 4],
      2: [2, 9],
      3: [7, 9],
      4: [2, 9],
      5: [7, 4],
    },
    [FrameActions.RIGHT]: {
      0: [4, 6],
      1: [9, 6],
      2: [4, 11],
      3: [9, 11],
      4: [4, 11],
      5: [9, 6],
    },
    [FrameActions.DOWN]: {
      0: [2, 8],
      1: [7, 8],
      2: [2, 13],
      3: [7, 13],
      4: [2, 13],
      5: [7, 8],
    },
    [FrameActions.LEFT]: {
      0: [0, 6],
      1: [5, 6],
      2: [0, 11],
      3: [5, 11],
      4: [0, 11],
      5: [5, 6],
    },
  },
};
