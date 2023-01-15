import { DataSource } from 'typeorm';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Address),
    inject: ['DATA_SOURCE'],
  },
];
