import ImageSRC from '../../../assets/sprites.png';
import { ANIMATION_INTERVAL_EXPLOSION, GRID } from '../../config';
import { Position } from '../../types/PositionType';
import { FrameActions, FrameEntities, FRAMES } from '../../types/SpriteTypes';

export class SpritesExplosion {
  private image: HTMLImageElement | undefined;

  private gridX: number = 16;

  private gridY: number = 16;

  private requestID: number = 0;

  private lastTimestamp: number = 0; // timestamp of the last frame rendering

  private dt: number = 0; // delta lastTimestamp vs now

  private frame: 0 | 1 | 2 | 3 | 4 | 5 = 0;

  private animationInterval: number = ANIMATION_INTERVAL_EXPLOSION;

  private interval: number = ANIMATION_INTERVAL_EXPLOSION;

  constructor(
    private context: CanvasRenderingContext2D,
    public pos: Position,
    private frameType: FrameEntities,
    private frameDirection: FrameActions,
  ) {
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
      if (this.frame === 5) {
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

    const entityFrames = FRAMES[this.frameType];
    if (entityFrames && entityFrames[this.frameDirection]) {
      const targetAction = entityFrames[this.frameDirection];
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
