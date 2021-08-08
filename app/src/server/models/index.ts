import {
  Sequelize, SequelizeOptions,
} from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './User';

dotenv.config();

const {
  POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB,
} = process.env;

console.log(POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB);

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'newPassword',
  database: POSTGRES_DB || 'gamedev_db',
  models: [User],
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
