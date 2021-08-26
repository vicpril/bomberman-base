import ImageSRC from '../../../assets/sprites.png';
import { GRID } from '../../config';
import { Position } from '../../types/PositionType';
import { FrameActions, FrameEntities, FRAMES } from '../../types/SpriteTypes';

export class SpritesMain {
  static instance: SpritesMain | null = null;

  private image: HTMLImageElement | undefined;

  private gridX: number = 16;

  private gridY: number = 16;

  constructor() {
    if (SpritesMain.instance) {
      return SpritesMain.instance;
    }
    this.image = new Image();

    this.image.src = ImageSRC;

    SpritesMain.instance = this;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    centerCoords: Position,
    entity: FrameEntities,
    action: FrameActions,
    frame: number,
  ): void {
    if (!this.image) { return; }

    const x = centerCoords.x - 0.5 * GRID;
    const y = centerCoords.y - 0.5 * GRID;
    ctx.clearRect(x, y, GRID, GRID);

    const sprite = { x: 10, y: 0 };

    const entityFrames = FRAMES[entity];
    if (entityFrames && entityFrames[action]) {
      const targetAction = entityFrames[action];
      if (targetAction) {
        const [sx, sy] = targetAction[frame];
        sprite.x = sx;
        sprite.y = sy;
      }
    }

    ctx.drawImage(
      this.image,
      sprite.x * this.gridX,
      sprite.y * this.gridY,
      this.gridX,
      this.gridY,
      x,
      y,
      GRID,
      GRID,
    );
  }
}

export function getSpritesMainInstance(): SpritesMain {
  if (!SpritesMain.instance) {
    SpritesMain.instance = new SpritesMain();
  }
  return SpritesMain.instance as SpritesMain;
}
