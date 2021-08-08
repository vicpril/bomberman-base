import {
  Model, Table, Column, PrimaryKey, DataType, AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column
    name!: string;
}
