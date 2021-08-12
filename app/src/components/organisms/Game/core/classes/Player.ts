import { KeyboardEvent } from 'react';
import {
  ANIMATION_FRAMES_PLAYER,
  ANIMATION_INTERVAL_PLAYER,
  GRID,
  PLAYER_BOMB_BLOWS_SIZE,
  PLAYER_HAS_BOMBS,
  PLAYER_START_SPEED,
} from '../config';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { IEntity } from '../interfaces/IEntity';
import { Position } from '../types/PositionType';
import { Bomb } from './Bomb';
import { getBattleField } from './BattleField';
import { gameService } from '../../services/gameService';
import { MovingEntity } from './MovingEntity';
import { Movements } from '../types/DirectionsType';
import { FrameActions, FrameEntities } from '../types/SpriteTypes';
import { getSpritesPlayerInstance } from './SpritesPlayer';

export class Player extends MovingEntity implements IEntity {
  type = EntitiesTypes.PLAYER;

  alive = true;

  pos: Position = { x: 1, y: 1 };

  coords: Position = { x: 1.5 * GRID, y: 1.5 * GRID }

  private hasBombs = PLAYER_HAS_BOMBS;

  bombBlownSize = PLAYER_BOMB_BLOWS_SIZE;

  private frames: number = ANIMATION_FRAMES_PLAYER;

  private currentFrame: number = 0;

  private animationInterval: number = ANIMATION_INTERVAL_PLAYER;

  private interval: number = ANIMATION_INTERVAL_PLAYER;

  constructor(private canvasCtx: CanvasRenderingContext2D) {
    super({
      speed: PLAYER_START_SPEED,
    });

    this.init();
  }

  protected isMovingAvailable = (direction: Movements) => {
    const BF = getBattleField();
    const targetCell = this.getNextPos(direction);
    return BF.isCellEmpty(targetCell);
  }

  addBombToPlayer() {
    this.hasBombs += 1;
    gameService.setBombs(this.hasBombs);
  }

  removeBombFromPlayer() {
    this.hasBombs -= 1;
    gameService.setBombs(this.hasBombs);
  }

  get bombs(): Bomb[] {
    const BF = getBattleField();
    return BF.findBombs(this);
  }

  init() {
    gameService.setBombs(this.hasBombs);
    document.addEventListener('keydown', this.handleKeydownEvent as () => {});
    document.addEventListener('keyup', this.handleKeyupEvent as () => {});
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeydownEvent as () => {});
    document.removeEventListener('keyup', this.handleKeyupEvent as () => {});
  }

  animationRefresh = (dt: number) => {
    if (this.direction === Movements.NONE) {
      this.currentFrame = 0;
      return;
    }
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

  action: FrameActions = FrameActions.DOWN;

  canvasAnimation = () => {
    switch (this.direction) {
      case Movements.DOWN:
        this.action = FrameActions.DOWN;
        break;
      case Movements.UP:
        this.action = FrameActions.UP;
        break;
      case Movements.RIGHT:
        this.action = FrameActions.RIGHT;
        break;
      case Movements.LEFT:
        this.action = FrameActions.LEFT;
        break;
      default:
        break;
    }
    getSpritesPlayerInstance()
      .draw(
        this.canvasCtx,
        this.coords,
        FrameEntities.PLAYER,
        this.action,
        this.currentFrame,
      );
  }

  placeBomb(): void {
    if (this.hasBombs <= 0) return;

    const BF = getBattleField();

    if (BF.getCell(this.pos) === EntitiesTypes.PLAYER) {
      const bomb = new Bomb(this.canvasCtx, this.pos, this, this.bombBlownSize);
      BF.addEntity(bomb);
      BF.setCell(this.pos, EntitiesTypes.BOMB);
      this.removeBombFromPlayer();
    }
  }

  handleKeydownEvent = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      this.moveOn(Movements.UP);
    } else if (event.key === 'ArrowDown') {
      this.moveOn(Movements.DOWN);
    } else if (event.key === 'ArrowRight') {
      this.moveOn(Movements.RIGHT);
    } else if (event.key === 'ArrowLeft') {
      this.moveOn(Movements.LEFT);
    } else if (event.key === ' ') {
      this.placeBomb();
    }
  };

  handleKeyupEvent = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp'
    || event.key === 'ArrowDown'
    || event.key === 'ArrowRight'
    || event.key === 'ArrowLeft') {
      this.moveOff();
    }
  };
}
