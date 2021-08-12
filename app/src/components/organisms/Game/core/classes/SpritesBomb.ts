import ImageSRC from '../assets/bomb-sprite.png';
import { GRID } from '../config';
import { Position } from '../types/PositionType';
import { BOMB_FRAMES } from '../types/SpriteBombTypes';
import { FrameActions, FrameEntities } from '../types/SpriteTypes';

export class SpritesBomb {
  static instance: SpritesBomb | null = null;

  private image: HTMLImageElement | undefined;

  private gridX: number = 20;

  private gridY: number = 20;

  constructor() {
    if (SpritesBomb.instance) {
      return SpritesBomb.instance;
    }
    this.image = new Image();

    this.image.src = ImageSRC;

    SpritesBomb.instance = this;
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

    const entityFrames = BOMB_FRAMES[entity];
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

export function getSpritesBombInstance(): SpritesBomb {
  if (!SpritesBomb.instance) {
    SpritesBomb.instance = new SpritesBomb();
  }
  return SpritesBomb.instance as SpritesBomb;
}
