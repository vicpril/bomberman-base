import { GRID } from 'game/core/config';
import { getDrawWalls } from 'game/core/helpers/getDrawWalls';

export const WallsRenderer = (context: CanvasRenderingContext2D) => {
  const clear = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const render = (data: [number, number][]) => {
    clear();
    const { softWallCanvas } = getDrawWalls();
    data.forEach(([y, x]) => {
      context.drawImage(softWallCanvas, x * GRID, y * GRID);
    });
  };

  return {
    render,
  };
};
