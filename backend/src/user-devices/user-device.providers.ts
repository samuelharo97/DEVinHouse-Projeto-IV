import { DeviceInfo } from 'src/user-devices/entities/info.entity';
import { DataSource } from 'typeorm';
import { DeviceSettings } from './entities/settings.entity';
import { UserDevice } from './entities/user.devices.entity';

export const userDeviceProviders = [
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
