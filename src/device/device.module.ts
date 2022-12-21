import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/user/user.providers';
import { deviceProviders } from './device.providers';
import { userDevices } from 'src/user-devices/user-device.providers';

@Module({
  controllers: [DeviceController],
  providers: [
    DeviceService,
    ...databaseProviders,
    ...userProviders,
    ...deviceProviders,
    ...userDevices,
  ],
})
export class DeviceModule {}
