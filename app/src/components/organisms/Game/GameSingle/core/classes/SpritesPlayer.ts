import ImageSRC from '../assets/player-sprite.png';
import { GRID } from '../config';
import { Position } from '../types/PositionType';
import { PLAYER_FRAMES } from '../types/SpritePlayerTypes';
import { FrameActions, FrameEntities } from '../types/SpriteTypes';

export class SpritesPlayer {
  static instance: SpritesPlayer | null = null;

  private image: HTMLImageElement | undefined;

  private gridX: number = 24;

  private gridY: number = 32;

  constructor() {
    if (SpritesPlayer.instance) {
      return SpritesPlayer.instance;
    }
    this.image = new Image();

    this.image.src = ImageSRC;

    SpritesPlayer.instance = this;
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

    const entityFrames = PLAYER_FRAMES[entity];
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
      y - 18,
      GRID,
      GRID + 18,
    );
  }
}

export function getSpritesPlayerInstance(): SpritesPlayer {
  if (!SpritesPlayer.instance) {
    SpritesPlayer.instance = new SpritesPlayer();
  }
  return SpritesPlayer.instance as SpritesPlayer;
}
