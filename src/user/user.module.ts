import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from './user.providers';
import { AuthService } from 'src/core/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { deviceProviders } from 'src/device/device.providers';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6 * 4,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...deviceProviders,
    UserService,
    AuthService,
    JwtService,
  ],
})
export class UserModule {}