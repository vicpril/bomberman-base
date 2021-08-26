import ImageSRC1 from '../../../assets/player1-vin.png';
import ImageSRC2 from '../../../assets/player2-vin.png';
import { ANIMATION_INTERVAL_PLAYER_VICTORY, GRID } from '../../config';
import { PLAYER_FRAMES } from '../../types/SpritePlayerTypes';
import { FrameActions, FrameEntities } from '../../types/SpriteTypes';

export class SpritesPlayerVictory {
  private image: HTMLImageElement | undefined;

  private gridX: number = 36;

  private gridY: number = 48;

  private lastTimestamp: number = 0; // timestamp of the last frame rendering

  private dt: number = 0; // delta lastTimestamp vs now

  private frame: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  private animationInterval: number = ANIMATION_INTERVAL_PLAYER_VICTORY;

  private interval: number = ANIMATION_INTERVAL_PLAYER_VICTORY;

  private frameType = FrameEntities.PLAYER;

  private frameDirection: FrameActions = FrameActions.VICTORY

  constructor(private canvasCtx: CanvasRenderingContext2D, private coords: [number, number], isSecond = false) {
    this.image = new Image();

    this.image.src = !isSecond ? ImageSRC1 : ImageSRC2;

    requestAnimationFrame(this.refresh.bind(this));
  }

  setCoords(coords: [number, number]) {
    this.coords = coords;
  }

  private updateTimestamps(timestamp: number) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    this.dt = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
  }

  private refresh(timestamp: number) {
    requestAnimationFrame(this.refresh.bind(this));

    this.updateTimestamps(timestamp);

    this.animationRefresh();

    this.draw();
  }

  animationRefresh = () => {
    this.interval -= this.dt;
    if (this.interval < 0) {
      this.interval = this.animationInterval;
      if (this.frame < 6) {
        this.frame += 1;
      } else {
        this.frame = 0;
      }
    }
  }

  draw(): void {
    if (!this.image) { return; }

    const x = this.coords[0] - 0.5 * GRID;
    const y = this.coords[1] - 0.5 * GRID;
    this.canvasCtx.clearRect(x, y - 25, GRID, GRID + 28);

    const sprite = { x: 0, y: 0 };

    const entityFrames = PLAYER_FRAMES[this.frameType];
    if (entityFrames && entityFrames[this.frameDirection]) {
      const targetAction = entityFrames[this.frameDirection];
      if (targetAction) {
        const [sx, sy] = targetAction[this.frame];
        sprite.x = sx;
        sprite.y = sy;
      }
    }

    this.canvasCtx.drawImage(
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
