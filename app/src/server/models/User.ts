import {
  Model, Table, Column, PrimaryKey, DataType, AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column
    name!: string;
}
