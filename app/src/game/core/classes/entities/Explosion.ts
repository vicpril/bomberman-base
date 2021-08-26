import { ExportDataTitles } from 'game/core/config';
import { EntitiesTypes } from '../../types/EntitiesTypes';
import { FrameActions, FrameEntities } from '../../types/SpriteTypes';
import { AbstractEntity, AbstractEntityOptions } from './AbstractEntity';

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
    FrameActions.PERMANENT |
    FrameActions.UP |
    FrameActions.RIGHT |
    FrameActions.DOWN |
    FrameActions.LEFT
  >

type ExplosionOptions = AbstractEntityOptions & {
  frameDirection: ExplosionFrameDirection,
  isCenter: boolean,
  isEnd: boolean,
}

export type ExplosionExportData = {
  [ExportDataTitles.position]: [number, number],
  [ExportDataTitles.direction]: ExplosionFrameDirection,
  [ExportDataTitles.frame_type]: ExplosionFrameType
}

export class Explosion extends AbstractEntity {
  type = EntitiesTypes.EXPLOSION;

  timer: number = 300;

  alive: boolean;

  frameType: ExplosionFrameType;

  frameDirection: ExplosionFrameDirection;

  constructor({
    pos, BF, frameDirection, isCenter, isEnd,
  }: ExplosionOptions) {
    super({ pos, BF });

    this.frameDirection = isCenter ? FrameActions.PERMANENT : frameDirection;
    // eslint-disable-next-line no-nested-ternary
    this.frameType = isCenter
      ? FrameEntities.EXPLOSION_CENTER
      : isEnd
        ? FrameEntities.EXPLOSION_END
        : FrameEntities.EXPLOSION_MIDDLE;

    this.BF.explosions[`${pos.x}:${pos.y}`] = this.getExportData();

    this.alive = true;

    this.init();
  }

  private init() {
    setTimeout(() => {
      this.alive = false;
      delete this.BF.explosions[`${this.pos.x}:${this.pos.y}`];
      this.BF.removeEntityFromPosition(this.type, this.pos);
    }, this.timer);
  }

  getExportData(): ExplosionExportData {
    return {
      [ExportDataTitles.position]: [this.pos.x, this.pos.y],
      [ExportDataTitles.direction]: this.frameDirection,
      [ExportDataTitles.frame_type]: this.frameType,
    };
  }
}
