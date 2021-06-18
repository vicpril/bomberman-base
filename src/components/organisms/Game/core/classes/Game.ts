import { MutableRefObject } from 'react';
import { GRID, NUM_COLS, NUM_ROWS } from '../config';
import { getDrawWalls } from '../helpers/getDrawWalls';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { BattleField, getBattleField } from './BattleField';
import { Player } from './Player';

export class Game {
    private context: CanvasRenderingContext2D;

    private requestID: number = 0;

    private lastTimestamp: number = 0; // timestamp of the last frame rendering

    private dt: number = 0; // delta lastTimestamp vs now

    private BF: BattleField;

    constructor(private canvasRef: MutableRefObject<HTMLCanvasElement | null>) {
      this.context = this.canvasRef.current?.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      this.BF = getBattleField();
    }

    start() {
      if (this.context) {
        this.BF.init();
        this.BF.addEntity(new Player(this.context));

        if (this.canvasRef.current) {
          this.requestID = requestAnimationFrame(this.step);
        }
      }
    }

    end() {
      cancelAnimationFrame(this.requestID);
      this.BF.destroy();
    }

    private step = (timestamp: number) => {
      this.requestID = requestAnimationFrame(this.step);

      // clear canvas
      this.context.clearRect(0, 0,
        (this.canvasRef.current as HTMLCanvasElement).width,
        (this.canvasRef.current as HTMLCanvasElement).height);

      // calc intervals
      this.updateTimestamps(timestamp);

      // render
      this.renderGame();

      // update & render entities
      this.BF.getEntities().forEach((entity) => {
        entity.refresh(this.dt);
        entity.render();
      });
      this.BF.clearEntities();
    };

    private updateTimestamps(timestamp: number) {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      this.dt = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;
    }

    private renderGame() {
      const { wallCanvas, softWallCanvas } = getDrawWalls();

      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
          const cell = this.BF.getCell({ x: col, y: row });
          switch (cell) {
            case EntitiesTypes.WALL:
              this.context.drawImage(wallCanvas, col * GRID, row * GRID);
              break;
            case EntitiesTypes.WALL_SOFT:
              this.context.drawImage(softWallCanvas, col * GRID, row * GRID);
              break;
            default:
              break;
          }
        }
      }
    }
}
