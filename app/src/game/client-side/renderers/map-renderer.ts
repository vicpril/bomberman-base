import {
  BATTLEFIELD_TEMPLATE, GRID, NUM_COLS, NUM_ROWS,
} from 'game/core/config';
import { getDrawWalls } from 'game/core/helpers/getDrawWalls';
import { EntitiesTypes } from 'game/core/types/EntitiesTypes';

export const MapRenderer = (context: CanvasRenderingContext2D) => {
  const render = () => {
    const { wallCanvas } = getDrawWalls();

    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        const cell = BATTLEFIELD_TEMPLATE[row][col];
        if (cell === EntitiesTypes.WALL) {
          context.drawImage(wallCanvas, col * GRID, row * GRID);
        }
      }
    }
  };

  context.canvas.style.backgroundColor = 'forestgreen';

  return {
    render,
  };
};
