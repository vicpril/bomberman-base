import { ANIMATION_FRAMES_EXPLOSION, ANIMATION_INTERVAL_EXPLOSION, GRID } from '../config';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { IEntity } from '../interfaces/IEntity';
import { Position } from '../types/PositionType';
import { FrameActions, FrameEntities } from '../types/SpriteTypes';
import { getSpritesInstance } from './Sprites';

export type ExplosionFrameType =
  Extract<
    FrameEntities,
    FrameEntities.EXPLOSION_CENTER |
    FrameEntities.EXPLOSION_MIDDLE |
    FrameEntities.EXPLOSION_END
  >

export type ExplosionFrameDirection =
  Extract<
    FrameActions,
    FrameActions.UP |
    FrameActions.RIGHT |
    FrameActions.DOWN |
    FrameActions.LEFT
  >

export class Explosion implements IEntity {
  type = EntitiesTypes.EXPLOSION;

  timer: number = 300;

  alive: boolean = true;

  frameType: ExplosionFrameType;

  private frames: number = ANIMATION_FRAMES_EXPLOSION;

  private currentFrame: number = 3;

  private animationInterval: number = ANIMATION_INTERVAL_EXPLOSION;

  private interval: number = ANIMATION_INTERVAL_EXPLOSION;

  constructor(
    private canvasCtx: CanvasRenderingContext2D,
    public pos: Position,
    public frameDirection: ExplosionFrameDirection,
    isCenter: boolean,
    isEnd: boolean,
  ) {
    // eslint-disable-next-line no-nested-ternary
    this.frameType = isCenter
      ? FrameEntities.EXPLOSION_CENTER
      : isEnd
        ? FrameEntities.EXPLOSION_END
        : FrameEntities.EXPLOSION_MIDDLE;
  }

  refresh(dt: number) {
    this.timer -= dt;

    if (this.timer <= 0) {
      this.alive = false;
    }

    // explosion animation
    this.interval -= dt;
    if (this.interval < 0) {
      this.interval = this.animationInterval;
      if (this.currentFrame === this.frames) {
        this.currentFrame = 0;
      } else {
        this.currentFrame += 1;
      }
    }
  }

  render() {
    const x = (this.pos.x + 0.5) * GRID;
    const y = (this.pos.y + 0.5) * GRID;

    getSpritesInstance()
      .draw(
        this.canvasCtx,
        { x, y },
        this.frameType,
        this.frameType !== FrameEntities.EXPLOSION_CENTER
          ? this.frameDirection
          : FrameActions.PERMANENT,
        this.currentFrame,
      );
  }
}
