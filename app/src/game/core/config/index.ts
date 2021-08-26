export const BATTLEFIELD_TEMPLATE = [
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'W'],
  ['W', 'x', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', 'x', 'W'],
  ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'W'],
  ['W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W'],
  ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
  ['W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W'],
  ['W', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
  ['W', 'x', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', 'x', 'W'],
  ['W', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
];

export const GRID = 64;
export const NUM_ROWS = 11;
export const NUM_COLS = 15;

export const SOFT_WALL_PROBABILITY = 0.50;

export const DEGREE_360 = 2 * Math.PI;

export const PLAYER_HAS_BOMBS = 2;
export const PLAYER_BOMB_BLOWS_SIZE = 3;
export const PLAYER_START_SPEED = 300;

export const INCREASE_BOMBS_AFTER_SECONDS = 15;

export const ANIMATION_FRAMES_BOMB = 3;
export const ANIMATION_FRAMES_PLAYER = 5;
export const ANIMATION_FRAMES_EXPLOSION = 5;

export const ANIMATION_INTERVAL_BOMB = 200;
export const ANIMATION_INTERVAL_PLAYER = 75;
export const ANIMATION_INTERVAL_PLAYER_DEFEAT = 150;
export const ANIMATION_INTERVAL_PLAYER_VICTORY = 100;
export const ANIMATION_INTERVAL_EXPLOSION = 50;

export const START_POSITION_FIRST_PLAYER = { x: 1, y: 1 };
export const START_POSITION_SECOND_PLAYER = { x: 13, y: 1 };

export const SECONDS_BEFORE_START = 3;

export enum ExportDataTitles {
  players = 0,
  soft_walls = 1,
  bombs = 2,
  explosions = 3,
  position = 4,
  coords = 5,
  frame_type = 6,
  direction = 7,
  movement = 8,
  player_bombs = 9,
  player_score = 10,
  timer = 11,
  alive = 12,
  index = 13
}
