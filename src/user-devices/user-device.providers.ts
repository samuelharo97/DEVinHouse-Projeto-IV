import { DeviceInfo } from 'src/device/entities/info.entity';
import { DeviceSettings } from 'src/device/entities/settings.entity';
import { DataSource } from 'typeorm';
import { UserDevice } from './entities/user.devices.entity';

export const userDevices = [
  {
    provide: 'USER_DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserDevice),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SETTINGS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceSettings),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'INFO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceInfo),
    inject: ['DATA_SOURCE'],
  },
];
