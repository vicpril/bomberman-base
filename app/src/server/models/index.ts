import {
  Sequelize, SequelizeOptions,
} from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './User';
import { UserTheme } from './UserTheme';
import { SiteTheme } from './SiteTheme';
import { Topic } from './Topic';
import { Comment } from './Comment';

dotenv.config();

const {
  POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'newPassword',
  database: POSTGRES_DB || 'gamedev_db',
  models: [User, UserTheme, SiteTheme, Topic, Comment],
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
