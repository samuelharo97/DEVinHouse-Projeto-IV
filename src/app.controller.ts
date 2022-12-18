import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { Device } from './device/entities/device.entity';
import { DeviceInfo } from './device/entities/info.entity';
import { DeviceSettings } from './device/entities/settings.entity';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    @Inject('DEVICE_REPOSITORY')
    private deviceRepo: Repository<Device>,
    @Inject('SETTINGS_REPOSITORY')
    private settingsRepo: Repository<DeviceSettings>,
    @Inject('INFO_REPOSITORY')
    private infoRepo: Repository<DeviceInfo>,
  ) {}

  @Post('/auth/register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.signUp(createUserDto);

      return newUser;
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/auth/login')
  async signIn(@Body() credentials: CredentialsDTO) {
    const responseToken = await this.authService.signIn(credentials);

    return responseToken;
  }
}
