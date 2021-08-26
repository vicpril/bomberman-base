import { BATTLEFIELD_TEMPLATE, SOFT_WALL_PROBABILITY } from '../config';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { Bomb } from './entities/Bomb';
import { Explosion, ExplosionExportData } from './entities/Explosion';
import { Player } from './entities/Player';
import { Position } from '../types/PositionType';
import { AbstractEntity } from './entities/AbstractEntity';
import { Game } from './Game';

type BFStorage = Record<string, [number, number]>

/**
 * Singleton
 */
export class BattleField {
  private isInitialized: boolean = false;

  private cells: EntitiesTypes[][] = [];

  // Entities on field for handling
  private entities: AbstractEntity[] = [];

  public players: Map<string, Player> = new Map();

  private softWalls: BFStorage = {};

  public bombs: BFStorage = {};

  public explosions: Record<string, ExplosionExportData> = {};

  constructor(private game: Game) {
    this.generateLevel();
    this.isInitialized = true;
  }

  private generateLevel(): void {
    const cells: EntitiesTypes[][] = [];

    BATTLEFIELD_TEMPLATE.forEach((row, rIdx) => {
      cells[rIdx] = [];

      row.forEach((cell, cIdx) => {
        switch (cell) {
          case EntitiesTypes.EMPTY:
            if (Math.random() < SOFT_WALL_PROBABILITY) {
              cells[rIdx][cIdx] = EntitiesTypes.WALL_SOFT;
              this.softWalls[`${cIdx}:${rIdx}`] = [rIdx, cIdx];
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

  destroyWall({ x, y }: Position) {
    delete this.softWalls[`${x}:${y}`];
    this.clearCell({ x, y });
  }

  exportCells() {
    return this.cells;
  }

  exportSoftWalls() {
    return Object.values(this.softWalls);
  }

  exportBombs() {
    return Object.values(this.bombs);
  }

  exportExplosions() {
    return Object.values(this.explosions);
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

  getEntities(): AbstractEntity[] {
    return this.entities;
  }

  addEntity(entity: AbstractEntity) {
    this.setCell(entity.pos, entity.type);
    this.entities.push(entity);
    if (entity instanceof Player) {
      this.players.set(entity.id, entity);
    }
  }

  findEntity(
    type: EntitiesTypes.EXPLOSION,
    position: Position
  ): Explosion | null;
  findEntity(type: EntitiesTypes.BOMB, position: Position): Bomb | null;
  findEntity(type: EntitiesTypes.PLAYER, position: Position): Player | null;
  findEntity(type: EntitiesTypes, position: Position): AbstractEntity | null {
    return (
      this.entities.find((entity) => (
        entity.type === type
          && entity.pos.x === position.x
          && entity.pos.y === position.y
      )) ?? null
    );
  }

  findAnyEntity(type: EntitiesTypes, position: Position): AbstractEntity | null {
    return (
      this.entities.find((entity) => (
        entity.type === type
          && entity.pos.x === position.x
          && entity.pos.y === position.y
      )) ?? null
    );
  }

  removeEntityFromPosition(type: EntitiesTypes, position: Position): boolean {
    const entity = this.findAnyEntity(type, position);
    if (entity) {
      this.entities = this.entities.filter((e) => e !== entity);
      return true;
    }
    return false;
  }

  findBombs(owner?: Player): Bomb[] {
    const bombs = this.entities.filter((entity) => entity.type === EntitiesTypes.BOMB) as Bomb[];
    return !owner ? bombs : bombs.filter((bomb) => bomb.owner === owner);
  }

  findPlayers(): Player[] {
    return [...this.players.values()];
  }

  findPlayerById(id: string): Player | null {
    return this.players.get(id) ?? null;
  }

  removePlayer(id: string) {
    const player = this.findPlayerById(id);
    if (player) {
      this.clearCell(player.pos);
      this.players.delete(id);
    }
  }

  clearEntities(): void {
    this.entities = this.entities.filter((entity) => entity.alive);
  }

  gameOver() {
    this.game.stopGame();
  }

  destroy() {
    // this.findPlayers().forEach((p) => p.destroy());
    this.cells = [];
    this.entities = [];
    this.isInitialized = false;
  }
}
