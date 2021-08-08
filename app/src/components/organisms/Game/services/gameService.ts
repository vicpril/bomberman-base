import { Observable } from '../core/helpers/Observable';

export enum GameStatus {
    NOT_STARTED = 'NOT_STARTED',
    SHOW_STAGE = 'SHOW_STAGE',
    IN_PROGRESS = 'IN_PROGRESS',
    STAGE_COMPLETED = 'STAGE_COMPLETED',
    FINISHED = 'FINISHED'
}

class GameService {
    readonly status = new Observable(GameStatus.NOT_STARTED);

    readonly stage = new Observable(1);

    readonly score = new Observable(0);

    readonly timer = new Observable(0);

    readonly bombs = new Observable(0);

    private timerID: number = 0;

    startGame(reset: boolean = true) {
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
      this.stopTimer();
      this.status.set(GameStatus.NOT_STARTED);
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
