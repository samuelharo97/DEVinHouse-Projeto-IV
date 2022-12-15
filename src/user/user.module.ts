import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from './user.providers';
import { AuthService } from 'src/core/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [
    ...databaseProviders,
    ...userProviders,
    UserService,
    AuthService,
    JwtService,
  ],
})
export class UserModule {}
