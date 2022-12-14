import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [...databaseProviders, ...userProviders, UserService],
})
export class UserModule {}
