import {
  Model, Table, Column, PrimaryKey, DataType, AllowNull, ForeignKey,
} from 'sequelize-typescript';
import { SiteTheme } from './SiteTheme';
import { User } from './User';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    ownerId!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    @ForeignKey(() => SiteTheme)
    themeId!: string;
}
