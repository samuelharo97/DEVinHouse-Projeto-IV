import { DataSource } from 'typeorm';
import { Device } from './entities/device.entity';

export const deviceProviders = [
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Device),
    inject: ['DATA_SOURCE'],
  },
];
