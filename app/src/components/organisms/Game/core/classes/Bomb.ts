import {
  ANIMATION_FRAMES_BOMB, ANIMATION_INTERVAL_BOMB, GRID, SCORE_WIN_PER_STAGE,
} from '../config';
import { EntitiesTypes } from '../types/EntitiesTypes';
import { defineDirection, DIRECTIONS, Movements } from '../types/DirectionsType';
import { IEntity } from '../interfaces/IEntity';
import { Explosion, ExplosionFrameDirection } from './Explosion';
import { getBattleField } from './BattleField';
import { Player } from './Player';
import { Position } from '../types/PositionType';
import { gameService } from '../../services/gameService';
import { FrameActions, FrameEntities } from '../types/SpriteTypes';
import { getSpritesBombInstance } from './SpritesBomb';

export class Bomb implements IEntity {
  type = EntitiesTypes.BOMB;

  radius = GRID * 0.4;

  alive: boolean = true;

  timer: number = 3000;

  private frames: number = ANIMATION_FRAMES_BOMB;

  private currentFrame: number = 0;

  private animationInterval: number = ANIMATION_INTERVAL_BOMB;

  private interval: number = ANIMATION_INTERVAL_BOMB;

  constructor(
    private canvasCtx: CanvasRenderingContext2D,
    public pos: Position,
    public owner: Player,
    public blownSize: number = 2,
  ) {}

  render() {
    const x = (this.pos.x + 0.5) * GRID;
    const y = (this.pos.y + 0.5) * GRID;

    getSpritesBombInstance()
      .draw(
        this.canvasCtx,
        { x, y },
        FrameEntities.BOMB,
        FrameActions.PERMANENT,
        this.currentFrame,
      );
  }

  refresh(dt: number): void {
    this.timer -= dt;

    // blow up the bomb
    if (this.timer <= 0) {
      this.blowUp();
      return;
    }

    // bomb animation
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

  blowUp(): void {
    if (!this.alive) return;

    this.alive = false;
    this.owner.addBombToPlayer();

    const BF = getBattleField();

    if (
      this.owner.pos.x === this.pos.x
      && this.owner.pos.y === this.pos.y
    ) {
      BF.gameOver(); return;
    }

    BF.clearCell(this.pos);

    const scoreToWin = SCORE_WIN_PER_STAGE * gameService.stage.get();

    // create Explosions per each directions
    Object.values(DIRECTIONS).forEach((dir) => {
      for (let i = 0; i < this.blownSize; i++) {
        // calculate position
        const pos: Position = {
          x: this.pos.x + dir.x * i,
          y: this.pos.y + dir.y * i,
        };
        const cell = BF.getCell(pos);
        if (cell === EntitiesTypes.WALL) return;

        // create Explosion in cell
        const isCenter = i === 0;
        const isEnd = i === this.blownSize - 1;
        let direction: ExplosionFrameDirection;
        switch (defineDirection(dir)) {
          default:
          case Movements.UP: direction = FrameActions.UP; break;
          case Movements.RIGHT: direction = FrameActions.RIGHT; break;
          case Movements.DOWN: direction = FrameActions.DOWN; break;
          case Movements.LEFT: direction = FrameActions.LEFT; break;
        }

        BF.addEntity(new Explosion(this.canvasCtx, pos, direction, isCenter, isEnd));

        // clear cell
        BF.clearCell(pos);

        switch (cell) {
          case EntitiesTypes.BOMB:
            // contact with another bomb - blow it up
            BF.findEntity(EntitiesTypes.BOMB, pos)?.blowUp();
            return; // stop explosion this side

          case EntitiesTypes.WALL_SOFT:
            gameService.increaseScore(1);
            if (gameService.score.get() >= scoreToWin) {
              BF.winStage(); return;
            }
            return; // stop explosion this side

          case EntitiesTypes.PLAYER:
            BF.gameOver();
            return;

          default:
            break;
        }
      }
    });
  }
}
