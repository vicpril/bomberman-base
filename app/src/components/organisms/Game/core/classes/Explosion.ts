import { GRID } from '../config';
import { DirectionType } from '../types/DirectionsType';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { IEntity } from '../interfaces/IEntity';
import { Position } from '../types/PositionType';

export class Explosion implements IEntity {
  type = EntitiesTypes.EXPLOSION;

  timer: number = 300;

  alive: boolean = true;

  constructor(
    private canvasCtx: CanvasRenderingContext2D,
    public pos: Position,
    public direction: DirectionType,
    private center: boolean,
  ) {}

  refresh(dt: number) {
    this.timer -= dt;

    if (this.timer <= 0) {
      this.alive = false;
    }
  }

  render() {
    const x = this.pos.x * GRID;
    const y = this.pos.y * GRID;

    const horizontal = this.direction.x !== 0;
    const vertical = this.direction.y !== 0;

    // red background
    this.canvasCtx.fillStyle = 'red';
    this.canvasCtx.fillRect(x, y, GRID, GRID);
    // orange background
    this.canvasCtx.fillStyle = 'orange';
    if (this.center || horizontal) {
      this.canvasCtx.fillRect(x, y + 6, GRID, GRID - 12);
    }
    if (this.center || vertical) {
      this.canvasCtx.fillRect(x + 6, y, GRID - 12, GRID);
    }

    // yellow background
    this.canvasCtx.fillStyle = 'yellow';
    if (this.center || horizontal) {
      this.canvasCtx.fillRect(x, y + 12, GRID, GRID - 24);
    }
    if (this.center || vertical) {
      this.canvasCtx.fillRect(x + 12, y, GRID - 24, GRID);
    }
  }
}
