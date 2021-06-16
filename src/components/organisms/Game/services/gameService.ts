import { Observable } from '../core/helpers/Observable';

export enum GameStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED'
}

class GameService {
    readonly status = new Observable(GameStatus.NOT_STARTED);

    readonly score = new Observable(0);

    readonly timer = new Observable(0)

    private timerID: number = 0;

    startGame() {
      this.status.set(GameStatus.IN_PROGRESS);
      this.score.set(0);
      this.timer.set(0);
      this.startTimer();
    }

    stopGame() {
      this.status.set(GameStatus.FINISHED);
      this.stopTimer();
    }

    increaseScore(payload: number) {
      this.score.set(this.score.get() + payload);
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
