import { KeyboardEvent } from 'react';
import {
  DEGREE_360,
  GRID,
  PLAYER_BOMB_BLOWS_SIZE,
  PLAYER_HAS_BOMBS,
} from '../config';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { IEntity } from '../interfaces/IEntity';
import { Position } from '../types/PositionType';
import { Bomb } from './Bomb';
import { getBattleField } from './BattleField';
import { gameService } from '../../services/gameService';

export class Player implements IEntity {
  type = EntitiesTypes.PLAYER;

  alive = true;

  pos: Position = {
    x: 1,
    y: 1,
  };

  private hasBombs = PLAYER_HAS_BOMBS;

  bombBlownSize = PLAYER_BOMB_BLOWS_SIZE;

  // for render
  radius = GRID * 0.3;

  constructor(private canvasCtx: CanvasRenderingContext2D) {
    this.init();
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
    document.addEventListener('keydown', this.handleKeyEvent as () => {});
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyEvent as () => {});
  }

  render() {
    const x = (this.pos.x + 0.5) * GRID;
    const y = (this.pos.y + 0.5) * GRID;

    this.canvasCtx.save();
    this.canvasCtx.fillStyle = 'white';
    this.canvasCtx.beginPath();
    this.canvasCtx.arc(x, y, this.radius, 0, DEGREE_360);
    this.canvasCtx.fill();
  }

  refresh = (dt: number) => dt

  move(position: Position): void {
    const BF = getBattleField();
    if (BF.isCellEmpty(position)) {
      // clear previous if no bomb there
      if (BF.getCell(this.pos) !== EntitiesTypes.BOMB) {
        BF.clearCell(this.pos);
      }
      this.pos = position;
      BF.setCell(this.pos, EntitiesTypes.PLAYER);
    }
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

  handleKeyEvent = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      this.move({ x: this.pos.x, y: this.pos.y - 1 });
    } else if (event.key === 'ArrowDown') {
      this.move({ x: this.pos.x, y: this.pos.y + 1 });
    } else if (event.key === 'ArrowRight') {
      this.move({ x: this.pos.x + 1, y: this.pos.y });
    } else if (event.key === 'ArrowLeft') {
      this.move({ x: this.pos.x - 1, y: this.pos.y });
    } else if (event.key === ' ') {
      this.placeBomb();
    }
  };
}
