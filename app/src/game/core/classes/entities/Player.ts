import {
  ExportDataTitles,
  GRID,
  PLAYER_BOMB_BLOWS_SIZE,
  PLAYER_HAS_BOMBS,
  PLAYER_START_SPEED,
} from '../../config';
import { EntitiesTypes } from '../../types/EntitiesTypes';
import { Position } from '../../types/PositionType';
import { Bomb } from './Bomb';
import { MovingEntity, MovingEntityOptions } from './MovingEntity';
import { Movements } from '../../types/DirectionsType';

type PlayerOptions = Omit<MovingEntityOptions, 'speed'> & {
  id: string
}

export type PlayerExportData = {
  [ExportDataTitles.position]?: [number, number],
  [ExportDataTitles.coords]: [number, number],
  [ExportDataTitles.movement]: Movements,
  [ExportDataTitles.player_bombs]: number,
  [ExportDataTitles.player_score]: number,
  [ExportDataTitles.alive]: number,
}

export class Player extends MovingEntity {
  public id: string;

  type = EntitiesTypes.PLAYER;

  alive = true;

  coords: Position;

  hasBombs = PLAYER_HAS_BOMBS;

  score: number = 0;

  bombBlownSize = PLAYER_BOMB_BLOWS_SIZE;

  constructor({ id, BF, pos }: PlayerOptions) {
    super({ BF, pos, speed: PLAYER_START_SPEED });
    this.id = id;
    this.coords = { x: (pos.x + 0.5) * GRID, y: (pos.y + 0.5) * GRID };
  }

  protected isMovingAvailable = (direction: Movements) => {
    const targetCell = this.getNextPos(direction);
    return this.BF.isCellEmpty(targetCell);
  }

  addBombToPlayer() {
    this.hasBombs += 1;
  }

  removeBombFromPlayer() {
    this.hasBombs -= 1;
  }

  get bombs(): Bomb[] {
    return this.BF.findBombs(this);
  }

  getExportData(): PlayerExportData {
    return {
      // [ExportDataTitles.position]: [this.pos.x, this.pos.y],
      [ExportDataTitles.coords]: [this.coords.x, this.coords.y],
      [ExportDataTitles.movement]: this.direction,
      [ExportDataTitles.player_bombs]: this.hasBombs,
      [ExportDataTitles.player_score]: this.score,
      [ExportDataTitles.alive]: this.alive ? 1 : 0,
    };
  }

  increaseScore(val: number = 1) {
    this.score += val;
  }

  placeBomb(): void {
    if (this.hasBombs <= 0) return;

    if (this.BF.getCell(this.pos) === EntitiesTypes.PLAYER) {
      const bomb = new Bomb({
        pos: this.pos, owner: this, blownSize: this.bombBlownSize, BF: this.BF,
      });
      this.BF.addEntity(bomb);
      this.BF.setCell(this.pos, EntitiesTypes.BOMB);
      this.removeBombFromPlayer();
    }
  }

  die() {
    this.alive = false;
    this.BF.gameOver();
  }
}
