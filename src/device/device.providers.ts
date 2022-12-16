import { DataSource } from 'typeorm';
import { Device } from './entities/device.entity';
import { DeviceInfo } from './entities/info.entity';
import { DeviceSettings } from './entities/settings.entity';
import { UserDevice } from './entities/user.devices.entity';

export const deviceProviders = [
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Device),
    inject: ['DATA_SOURCE'],
  },
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
