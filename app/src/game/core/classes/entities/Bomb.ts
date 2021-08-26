import { GRID } from '../../config';
import { EntitiesTypes } from '../../types/EntitiesTypes';
import { defineDirection, DIRECTIONS, Movements } from '../../types/DirectionsType';
import { Explosion, ExplosionFrameDirection } from './Explosion';
import { Player } from './Player';
import { Position } from '../../types/PositionType';
import { FrameActions } from '../../types/SpriteTypes';
import { AbstractEntity, AbstractEntityOptions } from './AbstractEntity';

type BombOptions = AbstractEntityOptions & {
  owner: Player,
  blownSize: number,
}

export class Bomb extends AbstractEntity {
  type = EntitiesTypes.BOMB;

  radius = GRID * 0.4;

  alive: boolean = true;

  timer: number = 3000;

  public owner: Player;

  private blownSize: number;

  constructor({
    pos, owner, blownSize, BF,
  }: BombOptions) {
    super({ BF, pos });
    this.owner = owner;
    this.blownSize = blownSize;
    this.init();
    this.BF.bombs[`${pos.x}:${pos.y}`] = [pos.x, pos.y];
  }

  private init() {
    setTimeout(() => {
      this.blowUp();
    }, this.timer);
  }

  blowUp(): void {
    if (!this.alive) return;

    this.alive = false;
    this.BF.removeEntityFromPosition(this.type, this.pos);

    this.owner.addBombToPlayer();

    if (
      this.owner.pos.x === this.pos.x
      && this.owner.pos.y === this.pos.y
    ) {
      this.owner.die();
    }

    this.BF.clearCell(this.pos);

    delete this.BF.bombs[`${this.pos.x}:${this.pos.y}`];

    // create Explosions per each directions
    Object.values(DIRECTIONS).forEach((dir) => {
      for (let i = 0; i < this.blownSize; i++) {
        // calculate position
        const pos: Position = {
          x: this.pos.x + dir.x * i,
          y: this.pos.y + dir.y * i,
        };
        const cell = this.BF.getCell(pos);
        if (cell === EntitiesTypes.WALL) return;
        if (cell === EntitiesTypes.WALL_SOFT) {
          this.BF.destroyWall(pos);
        }
        if (cell === EntitiesTypes.BOMB) {
          this.BF.findEntity(EntitiesTypes.BOMB, pos)?.blowUp();
          return;
        }

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

        this.BF.addEntity(new Explosion({
          pos, BF: this.BF, frameDirection: direction, isCenter, isEnd,
        }));

        // clear cell
        this.BF.clearCell(pos);

        switch (cell) {
          case EntitiesTypes.WALL_SOFT:
            this.owner.increaseScore();
            return; // stop explosion this side

          case EntitiesTypes.PLAYER:
            this.BF.findEntity(EntitiesTypes.PLAYER, pos)?.die();
            return;

          default:
            break;
        }
      }
    });
  }
}
