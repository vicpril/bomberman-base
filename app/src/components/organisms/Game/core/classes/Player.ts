import { KeyboardEvent } from 'react';
import {
  DEGREE_360,
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

export class Player extends MovingEntity implements IEntity {
  type = EntitiesTypes.PLAYER;

  alive = true;

  pos: Position = { x: 1, y: 1 };

  coords: Position = { x: 1.5 * GRID, y: 1.5 * GRID }

  private hasBombs = PLAYER_HAS_BOMBS;

  bombBlownSize = PLAYER_BOMB_BLOWS_SIZE;

  // for render
  private radius = GRID * 0.3;

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

  canvasAnimation = () => {
    this.canvasCtx.save();
    this.canvasCtx.fillStyle = 'white';
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(this.coords.x, this.coords.y, this.radius, 0, DEGREE_360);
    this.canvasCtx.fill();
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
