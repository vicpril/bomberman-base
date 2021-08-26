import { io } from 'game/server-side';
import {
  START_POSITION_FIRST_PLAYER, START_POSITION_SECOND_PLAYER, ExportDataTitles, INCREASE_BOMBS_AFTER_SECONDS,
} from '../config';
import { Observable } from '../helpers/Observable';
import { BattleField } from './BattleField';
import { ExplosionExportData } from './entities/Explosion';
import { Player, PlayerExportData } from './entities/Player';

export enum GameStatus {
    NOT_STARTED = 'NOT_STARTED',
    SHOW_STAGE = 'SHOW_STAGE',
    IN_PROGRESS = 'IN_PROGRESS',
    STAGE_COMPLETED = 'STAGE_COMPLETED',
    FINISHED = 'FINISHED',
    WAITING_PLAYER = 'WAITING_PLAYER'
}

export enum GameMode {
    SINGLE_PLAYER = 'SINGLE_PLAYER',
    MULTI_PLAYER = 'MULTI_PLAYER',
}

export type GameExportData = {
  [ExportDataTitles.index]: number,
  [ExportDataTitles.players]: PlayerExportData[],
  [ExportDataTitles.soft_walls]: [number, number][],
  [ExportDataTitles.bombs]: [number, number][],
  [ExportDataTitles.explosions]: ExplosionExportData[],
  [ExportDataTitles.timer]: number,
}

export class Game {
  readonly mode = new Observable(GameMode.MULTI_PLAYER);

  readonly status = new Observable(GameStatus.NOT_STARTED);

  readonly stage = new Observable(1);

  readonly timer = new Observable(0);

  public BF = new BattleField(this);

  private timerID = 0;

  public alive = true

  constructor() {
    this.timer.subscribe((time) => {
      if (time % INCREASE_BOMBS_AFTER_SECONDS === 0) {
        this.BF.findPlayers().forEach((p) => p.addBombToPlayer());
      }
    });
  }

  startGame() {
    this.timer.set(0);
    this.status.set(GameStatus.IN_PROGRESS);
    this.startTimer();
  }

  stopGame() {
    this.stopTimer();
    setTimeout(() => {
      this.status.set(GameStatus.FINISHED);
      [...this.BF.players.entries()].forEach(([id, player]: [string, Player]) => {
        io.to(id).emit(player.alive ? 'victory' : 'defeat');
      });
    }, 500);
  }

  exitGame() {
    this.BF.destroy();
    this.stopTimer();
    this.status.set(GameStatus.NOT_STARTED);
    this.stage.set(1);
    this.timer.set(0);
  }

  private startTimer() {
    this.timerID = setInterval(() => {
      this.timer.set(this.timer.get() + 1);
    }, 1000) as unknown as number;
  }

  private stopTimer() {
    clearInterval(this.timerID);
  }

  addFirstPlayer(id: string) {
    this.BF.addEntity(new Player({ id, BF: this.BF, pos: START_POSITION_FIRST_PLAYER }));
  }

  addSecondPlayer(id: string) {
    this.BF.addEntity(new Player({ id, BF: this.BF, pos: START_POSITION_SECOND_PLAYER }));
  }

  exportData(playerIndex: number): GameExportData {
    return {
      [ExportDataTitles.index]: playerIndex,
      [ExportDataTitles.players]: this.BF.findPlayers().map((p) => p.getExportData()),
      [ExportDataTitles.soft_walls]: this.BF.exportSoftWalls(),
      [ExportDataTitles.bombs]: this.BF.exportBombs(),
      [ExportDataTitles.explosions]: this.BF.exportExplosions(),
      [ExportDataTitles.timer]: this.timer.get(),
    };
  }
}
