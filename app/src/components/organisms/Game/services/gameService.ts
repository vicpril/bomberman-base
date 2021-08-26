import { Socket } from 'socket.io-client';
import { CanvasLayersContext, GameRenderer, GameRendererCreator } from 'game/client-side/renderers/game-renderer';
import { GameExportData } from 'game/core/classes/Game';
import { ExportDataTitles, SECONDS_BEFORE_START } from 'game/core/config';
import { socket } from 'game/core/services/socketService';
import { getBattleField } from '../GameSingle/core/classes/BattleField';
import { Observable } from '../GameSingle/core/helpers/Observable';
import { addControlListener, removeControlListener } from './controlHandler';

export enum GameStatus {
    START_SCREEN = 'START_SCREEN',
    NOT_STARTED = 'NOT_STARTED',
    SHOW_STAGE = 'SHOW_STAGE',
    IN_PROGRESS = 'IN_PROGRESS',
    STAGE_COMPLETED = 'STAGE_COMPLETED',
    FINISHED = 'FINISHED',
    VICTORY = 'VICTORY',
    DEFEAT = 'DEFEAT',
    WAITING_PLAYER = 'WAITING_PLAYER'
}

export enum GameMode {
    SINGLE_PLAYER = 'SINGLE_PLAYER',
    MULTI_PLAYER = 'MULTI_PLAYER',
}

type GameOptions = {
  mode?: GameMode,
  reset?: boolean
}

class GameService {
    readonly mode = new Observable(GameMode.MULTI_PLAYER);

    readonly status = new Observable(GameStatus.START_SCREEN);

    readonly stage = new Observable(1);

    readonly score = new Observable(0);

    readonly timer = new Observable(0);

    readonly bombs = new Observable(0);

    private timerID: number = 0;

    readonly startingTimer = new Observable(SECONDS_BEFORE_START);

    private socket: Socket = socket;

    private gameRenderer: GameRenderer | null = null;

    setMode(mode: GameMode) {
      this.mode.set(mode);
    }

    initMultiplayerGame() {
      // подписка на стейт
      this.socket.on('state', (state: GameExportData) => {
        if (this.gameRenderer) {
          this.gameRenderer.render(state);
          this.updateStats(state);
        }
      });
      // подписка на ожтдание игрока
      this.socket.on('game:waiting-player', () => {
        console.log('~ game:waiting-player');
        this.status.set(GameStatus.WAITING_PLAYER);
        this.socket.off('game:waiting-player');
      });
      // подписка на старт игры
      this.socket.on('game:starting', () => {
        console.log('~ game:starting');
        const startingTimerId = window.setInterval(() => {
          if (this.startingTimer.get() > 0) {
            this.startingTimer.set(this.startingTimer.get() - 1);
          } else {
            window.clearInterval(startingTimerId);
            this.startMultiplayerGame();
            this.startingTimer.set(SECONDS_BEFORE_START);
          }
        }, 1000);
        this.status.set(GameStatus.NOT_STARTED);
        this.socket.off('game:starting');
      });
      this.socket.on('state', (state: GameExportData) => {
        if (this.gameRenderer) {
          this.gameRenderer.render(state);
          this.updateStats(state);
        }
      });
      // подписка на дисконнект
      this.socket.on('player:disconnected', (id: string) => {
        console.log('~ player:disconnected', id);
        this.status.set(GameStatus.VICTORY);
        this.destroyMultiplayerGame();
      });
      // подписка на поражение
      this.socket.on('defeat', () => {
        console.log('~ defeat');
        this.status.set(GameStatus.DEFEAT);
        this.destroyMultiplayerGame();
      });
      this.socket.connect();
      this.socket.emit('player/connect');
    }

    updateStats(state: GameExportData) {
      this.timer.set(state[ExportDataTitles.timer]);
      const currentPlayerIdx = state[ExportDataTitles.index];
      this.bombs.set(state[ExportDataTitles.players][currentPlayerIdx][ExportDataTitles.player_bombs]);
      this.score.set(state[ExportDataTitles.players][currentPlayerIdx][ExportDataTitles.player_score]);
    }

    startMultiplayerGame() {
      addControlListener();
      this.status.set(GameStatus.IN_PROGRESS);
    }

    destroyMultiplayerGame() {
      removeControlListener();
      this.socket.off('state');
      this.socket.off('victory');
      this.socket.off('defeat');
      this.socket.disconnect();
    }

    setCanvasLayersContext(ctx: CanvasLayersContext | null) {
      if (ctx) {
        this.gameRenderer = GameRendererCreator(ctx);
      }
    }

    startGame({ reset = true }: GameOptions) {
      this.timer.set(0);
      this.status.set(GameStatus.SHOW_STAGE);
      if (reset) {
        this.score.set(0);
        this.stage.set(1);
      }
      setTimeout(() => {
        this.status.set(GameStatus.IN_PROGRESS);
        this.startTimer();
      }, 1500);
    }

    stopGame(win = false) {
      this.stopTimer();
      if (win) {
        this.status.set(GameStatus.STAGE_COMPLETED);
        this.stage.set(this.stage.get() + 1);
      } else {
        this.status.set(GameStatus.FINISHED);
      }
    }

    exitGame() {
      getBattleField().destroy();
      this.stopTimer();
      this.status.set(GameStatus.START_SCREEN);
      this.stage.set(1);
      this.bombs.set(0);
      this.score.set(0);
      this.timer.set(0);
    }

    increaseScore(payload: number) {
      this.score.set(this.score.get() + payload);
    }

    setBombs(payload: number) {
      this.bombs.set(payload);
    }

    private startTimer() {
      this.timerID = window.setInterval(() => {
        this.timer.set(this.timer.get() + 1);
      }, 1000);
    }

    private stopTimer() {
      window.clearInterval(this.timerID);
    }
}

export const gameService = new GameService();
