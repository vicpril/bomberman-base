import { EntitiesTypes } from '../types/EntitiesTypes';
import { Position } from '../types/PositionType';

export interface IEntity {
  type: EntitiesTypes;
  pos: Position;
  alive: boolean;

  render(): void;

  refresh(dt: number): void;
}
