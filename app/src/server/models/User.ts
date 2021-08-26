import {
  Model, Table, Column, PrimaryKey, DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column
    name!: string;
}
