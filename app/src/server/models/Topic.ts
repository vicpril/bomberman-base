import {
  AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table,
} from 'sequelize-typescript';

import { Comment } from './Comment';

@Table({
  tableName: 'topics',
  timestamps: true,
})
export class Topic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  owner!: string

  @Column(DataType.INTEGER)
  views!: number

  @HasMany(() => Comment, { onDelete: 'cascade' })
  comments!: Comment[];

  touch(): void {
    this.changed('updatedAt', true);
    this.save();
  }

  increaseViews(): void {
    this.views += 1;
    this.save();
  }
}
