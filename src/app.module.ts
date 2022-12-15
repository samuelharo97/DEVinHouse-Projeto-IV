import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';
import { databaseProviders } from './core/database/database.providers';
import { UserModule } from './user/user.module';
import { userProviders } from './user/user.providers';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
      signOptions: {
        expiresIn: 60 * 6 * 4,
      },
    }),
    UserModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [
    ...databaseProviders,
    ...userProviders,
    AppService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
