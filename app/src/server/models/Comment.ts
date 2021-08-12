import {
  AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table,
} from 'sequelize-typescript';
import { Topic } from './Topic';

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  username!: string

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
  })
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @Column(DataType.TEXT)
  text!: string;
}
