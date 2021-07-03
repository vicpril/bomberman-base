import { SOFT_WALL_PROBABILITY } from '../config';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { Bomb } from './Bomb';
import { Explosion } from './Explosion';
import { Player } from './Player';
import { Position } from '../types/PositionType';
import { IEntity } from '../interfaces/IEntity';
import { gameService } from '../../services/gameService';

const template = [
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'W'],
  ['W', 'x', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', 'x', 'W'],
  ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'W'],
  ['W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W'],
  ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
  ['W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W'],
  ['W', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
  ['W', 'x', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W', 'x', 'W'],
  ['W', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
];

/**
 * Singleton
 */
export class BattleField {
  static instance: BattleField | null = null;

  private isInitialized: boolean = false;

  private cells: EntitiesTypes[][] = [];

  // Entities on field for handling
  private entities: IEntity[] = [];

  constructor() {
    if (BattleField.instance) {
      return BattleField.instance;
    }
    BattleField.instance = this;
  }

  init() {
    this.generateLevel();
    this.isInitialized = true;
  }

  private generateLevel(): void {
    const cells: EntitiesTypes[][] = [];

    template.forEach((row, rIdx) => {
      cells[rIdx] = [];

      row.forEach((cell, cIdx) => {
        switch (cell) {
          case EntitiesTypes.EMPTY:
            if (Math.random() < SOFT_WALL_PROBABILITY) {
              cells[rIdx][cIdx] = EntitiesTypes.WALL_SOFT;
            }
            break;

          case EntitiesTypes.EMPTY_REQUIRED:
            cells[rIdx][cIdx] = EntitiesTypes.EMPTY;
            break;

          case EntitiesTypes.WALL:
            cells[rIdx][cIdx] = EntitiesTypes.WALL;
            break;

          default:
            cells[rIdx][cIdx] = EntitiesTypes.EMPTY;
            break;
        }
      });
    });

    this.cells = cells;
  }

  getCell(position: Position): EntitiesTypes {
    if (!this.isInitialized) return EntitiesTypes.EMPTY;
    return this.cells[position.y][position.x];
  }

  setCell(position: Position, instance: EntitiesTypes): void {
    if (!this.isInitialized) return;
    this.cells[position.y][position.x] = instance;
  }

  isCellEmpty(position: Position): boolean {
    if (!this.isInitialized) return false;
    const cell = this.getCell(position);
    return typeof cell === 'undefined' || cell === EntitiesTypes.EMPTY;
  }

  clearCell(position: Position) {
    if (!this.isInitialized) return;
    this.setCell(position, EntitiesTypes.EMPTY);
  }

  getEntities(): IEntity[] {
    return this.entities;
  }

  addEntity(entity: IEntity) {
    this.entities.push(entity);
  }

  findEntity(
    type: EntitiesTypes.EXPLOSION,
    position: Position
  ): Explosion | null;
  findEntity(type: EntitiesTypes.BOMB, position: Position): Bomb | null;
  findEntity(type: EntitiesTypes.PLAYER, position: Position): Player | null;
  findEntity(type: EntitiesTypes, position: Position): IEntity | null {
    return (
      this.entities.find((entity) => (
        entity.type === type
          && entity.pos.x === position.x
          && entity.pos.y === position.y
      )) ?? null
    );
  }

  findBombs(owner?: Player): Bomb[] {
    const bombs = this.entities.filter((entity) => entity.type === EntitiesTypes.BOMB) as Bomb[];
    return !owner ? bombs : bombs.filter((bomb) => bomb.owner === owner);
  }

  findPlayers(): Player[] {
    return this.entities.filter((entity) => entity.type === EntitiesTypes.PLAYER) as Player[];
  }

  clearEntities(): void {
    this.entities = this.entities.filter((entity) => entity.alive);
  }

  gameOver() {
    this.destroy();
    gameService.stopGame();
  }

  winStage() {
    this.destroy();
    gameService.stopGame(true);
  }

  destroy() {
    this.findPlayers().forEach((p) => p.destroy());
    this.cells = [];
    this.entities = [];
    this.isInitialized = false;
    BattleField.instance = null;
  }
}

export function getBattleField(): BattleField {
  if (!BattleField.instance) {
    BattleField.instance = new BattleField();
  }
  return BattleField.instance as BattleField;
}
