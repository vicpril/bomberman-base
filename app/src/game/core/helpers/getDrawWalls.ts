import { GRID } from '../config';

export const getDrawWalls = () => {
  /**
   * Brick (soft) wall
   */
  const softWallCanvas = document.createElement('canvas');
  const softWallCtx = softWallCanvas.getContext(
    '2d',
  ) as CanvasRenderingContext2D;
  softWallCanvas.width = GRID;
  softWallCanvas.height = GRID;
  // color back
  softWallCtx.fillStyle = 'black';
  softWallCtx.fillRect(0, 0, GRID, GRID);
  // color front
  softWallCtx.fillStyle = 'grey';
  // bricks 1st row
  softWallCtx.fillRect(1, 1, GRID - 2, 20);
  // bricks 2nd row
  softWallCtx.fillRect(0, 23, 20, 18);
  softWallCtx.fillRect(22, 23, 42, 18);
  // bricks 3rd row
  softWallCtx.fillRect(0, 43, 42, 20);
  softWallCtx.fillRect(44, 43, 20, 20);

  /**
   * Wall (undestructable)
   */
  const wallCanvas = document.createElement('canvas');
  const wallCtx = wallCanvas.getContext('2d') as CanvasRenderingContext2D;
  wallCanvas.width = GRID;
  wallCanvas.height = GRID;
  // shadow
  wallCtx.fillStyle = 'black';
  wallCtx.fillRect(0, 0, GRID, GRID);
  // light
  wallCtx.fillStyle = 'white';
  wallCtx.fillRect(0, 0, GRID - 2, GRID - 2);
  // wall
  wallCtx.fillStyle = '#a9a9a9';
  wallCtx.fillRect(2, 2, GRID - 4, GRID - 4);

  return { wallCanvas, softWallCanvas };
};
