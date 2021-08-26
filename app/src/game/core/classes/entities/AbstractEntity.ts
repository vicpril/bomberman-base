import { EntitiesTypes } from 'game/core/types/EntitiesTypes';
import { Position } from 'game/core/types/PositionType';
import { BattleField } from '../BattleField';

export type AbstractEntityOptions = {
  BF: BattleField,
  pos: Position
}

export abstract class AbstractEntity {
  abstract type: EntitiesTypes;

  abstract alive = true;

  public pos: Position

  public BF: BattleField

  constructor(options: AbstractEntityOptions) {
    this.BF = options.BF;
    this.pos = options.pos;
  }
}
