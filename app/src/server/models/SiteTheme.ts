import {
  Model, Table, Column, PrimaryKey, DataType, AutoIncrement, AllowNull, Unique, Index,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Index
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    description!: string;
}
