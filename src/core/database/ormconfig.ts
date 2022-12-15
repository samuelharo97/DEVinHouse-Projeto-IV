/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from 'typeorm';
require('dotenv-flow').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/../../user/**/*.entity{.ts,.js}',
    'dist/user/**/*.entity.js',
  ],
  migrations: [
    __dirname + './migrations/*{.ts,.js}',
    'dist/core/database/migrations/*{.ts,.js}',
  ],
  synchronize: true,
  migrationsRun: false,
  migrationsTableName: 'history',
});
