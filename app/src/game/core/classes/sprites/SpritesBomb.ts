import ImageSRC from '../../../assets/bomb-sprite.png';
import { ANIMATION_INTERVAL_BOMB, GRID } from '../../config';
import { Position } from '../../types/PositionType';
import { BOMB_FRAMES } from '../../types/SpriteBombTypes';
import { FrameActions, FrameEntities } from '../../types/SpriteTypes';

export class SpritesBomb {
  private image: HTMLImageElement | undefined;

  private gridX: number = 20;

  private gridY: number = 20;

  private requestID: number = 0;

  private lastTimestamp: number = 0; // timestamp of the last frame rendering

  private dt: number = 0; // delta lastTimestamp vs now

  private frame: 0 | 1 | 2 | 3 = 0;

  private animationInterval: number = ANIMATION_INTERVAL_BOMB;

  private interval: number = ANIMATION_INTERVAL_BOMB;

  constructor(private context: CanvasRenderingContext2D, public pos: Position) {
    this.image = new Image();

    this.image.src = ImageSRC;

    this.requestID = requestAnimationFrame(this.refresh.bind(this));
  }

  private updateTimestamps(timestamp: number) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    this.dt = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
  }

  private refresh(timestamp: number) {
    this.requestID = requestAnimationFrame(this.refresh.bind(this));

    this.updateTimestamps(timestamp);

    // bomb animation
    this.interval -= this.dt;
    if (this.interval < 0) {
      this.interval = this.animationInterval;
      if (this.frame === 3) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
    }

    this.draw();
  }

  destroy() {
    cancelAnimationFrame(this.requestID);
    const x = this.pos.x * GRID;
    const y = this.pos.y * GRID;
    this.context.clearRect(x, y, GRID, GRID);
  }

  private draw(): void {
    if (!this.image) { return; }

    const x = this.pos.x * GRID;
    const y = this.pos.y * GRID;
    this.context.clearRect(x, y, GRID, GRID);

    const sprite = { x: 10, y: 0 };

    const entityFrames = BOMB_FRAMES[FrameEntities.BOMB];
    if (entityFrames && entityFrames[FrameActions.PERMANENT]) {
      const targetAction = entityFrames[FrameActions.PERMANENT];
      if (targetAction) {
        const [sx, sy] = targetAction[this.frame];
        sprite.x = sx;
        sprite.y = sy;
      }
    }

    this.context.drawImage(
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
