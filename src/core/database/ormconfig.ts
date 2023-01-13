/* eslint-disable @typescript-eslint/no-var-requires */
import { Device } from 'src/device/entities/device.entity';
import { DeviceInfo } from 'src/user-devices/entities/info.entity';
import { DeviceSettings } from 'src/user-devices/entities/settings.entity';
import { UserDevice } from 'src/user-devices/entities/user.devices.entity';
import { Address } from 'src/user/entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
require('dotenv-flow').config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: true,
  entities: [UserDevice, Address, User, DeviceInfo, DeviceSettings, Device],
  migrations: [
    __dirname + './migrations/*{.ts,.js}',
    'dist/core/database/migrations/*{.ts,.js}',
  ],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'history',
});
