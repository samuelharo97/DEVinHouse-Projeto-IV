import { Module } from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { UserDevicesController } from './user-devices.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { deviceProviders } from 'src/device/device.providers';
import { userProviders } from 'src/user/user.providers';
import { userDevices } from './user-device.providers';

@Module({
  controllers: [UserDevicesController],
  providers: [
    UserDevicesService,
    ...databaseProviders,
    ...userProviders,
    ...deviceProviders,
    ...userDevices,
  ],
})
export class UserDevicesModule {}