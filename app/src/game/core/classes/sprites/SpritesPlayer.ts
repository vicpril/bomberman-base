import { Movements } from 'game/core/types/DirectionsType';
import ImageSRC1 from '../../../assets/player1-sprite.png';
import ImageSRC2 from '../../../assets/player2-sprite.png';
import { ANIMATION_INTERVAL_EXPLOSION, GRID } from '../../config';
import { PLAYER_FRAMES } from '../../types/SpritePlayerTypes';
import { FrameActions, FrameEntities } from '../../types/SpriteTypes';

export class SpritesPlayer {
  private image: HTMLImageElement | undefined;

  private gridX: number = 24;

  private gridY: number = 32;

  private lastTimestamp: number = 0; // timestamp of the last frame rendering

  private dt: number = 0; // delta lastTimestamp vs now

  private frame: 0 | 1 | 2 | 3 | 4 | 5 = 0;

  private animationInterval: number = ANIMATION_INTERVAL_EXPLOSION;

  private interval: number = ANIMATION_INTERVAL_EXPLOSION;

  private frameType = FrameEntities.PLAYER;

  private frameDirection: FrameActions = FrameActions.DOWN

  private direction: Movements = Movements.NONE

  constructor(private canvasCtx: CanvasRenderingContext2D, private coords: [number, number], isSecond = false) {
    this.image = new Image();

    this.image.src = !isSecond ? ImageSRC1 : ImageSRC2;

    requestAnimationFrame(this.refresh.bind(this));
  }

  setCoords(coords: [number, number]) {
    this.coords = coords;
  }

  setDirection(move: Movements) {
    this.direction = move;
    let dir;
    switch (this.direction) {
      default:
      case Movements.NONE: dir = FrameActions.PERMANENT; break;
      case Movements.DOWN: dir = FrameActions.DOWN; break;
      case Movements.UP: dir = FrameActions.UP; break;
      case Movements.RIGHT: dir = FrameActions.RIGHT; break;
      case Movements.LEFT: dir = FrameActions.LEFT; break;
    }
    if (dir !== FrameActions.PERMANENT) {
      this.frameDirection = dir;
    }
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
    if (this.direction === Movements.NONE) {
      this.frame = 0;
      return;
    }
    this.interval -= this.dt;
    if (this.interval < 0) {
      this.interval = this.animationInterval;
      if (this.frame === 5) {
        this.frame = 0;
      } else {
        this.frame += 1;
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
