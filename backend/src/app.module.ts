import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AuthService } from './core/auth/auth.service';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';
import { databaseProviders } from './core/database/database.providers';
import { UserModule } from './user/user.module';
import { userProviders } from './user/user.providers';
import { DeviceModule } from './device/device.module';
import { deviceProviders } from './device/device.providers';
import { UserDevicesModule } from './user-devices/user-devices.module';
import { userDeviceProviders } from './user-devices/user-device.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 1728000,
      },
    }),
    UserModule,
    DeviceModule,
    UserDevicesModule,
  ],
  controllers: [AppController],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...deviceProviders,
    ...userDeviceProviders,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
