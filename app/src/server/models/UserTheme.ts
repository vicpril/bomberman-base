import {
  Model, Table, Column, PrimaryKey, DataType, AutoIncrement, AllowNull, ForeignKey,
} from 'sequelize-typescript';
import { SiteTheme } from './SiteTheme';
import { User } from './User';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    @ForeignKey(() => SiteTheme)
    themeId!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
      type: DataType.INTEGER,
      field: 'owner_id',
    })
    ownerId!: string;
}
