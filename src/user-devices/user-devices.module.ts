import { Module } from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { UserDevicesController } from './user-devices.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { deviceProviders } from 'src/device/device.providers';
import { userProviders } from 'src/user/user.providers';
import { userDeviceProviders } from './user-device.providers';
import { AuthService } from 'src/core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserDevicesController],
  providers: [
    UserDevicesService,
    ...databaseProviders,
    ...userProviders,
    ...deviceProviders,
    ...userDeviceProviders,
    AuthService,
    JwtService,
  ],
})
export class UserDevicesModule {}
