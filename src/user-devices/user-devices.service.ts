import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { DeviceInfo } from './entities/info.entity';
import { DeviceSettings } from './entities/settings.entity';
import { UserDevice } from './entities/user.devices.entity';

@Injectable()
export class UserDevicesService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
    @Inject('USER_DEVICE_REPOSITORY')
    private userDeviceRepo: Repository<UserDevice>,
    @Inject('SETTINGS_REPOSITORY')
    private settingsRepo: Repository<DeviceSettings>,
    @Inject('INFO_REPOSITORY')
    private infoRepo: Repository<DeviceInfo>,
  ) {}

  create(userId: string, createUserDeviceDto: CreateUserDeviceDto) {
    return 'This action adds a new userDevice';
  }

  findAll() {
    return `This action returns all userDevices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDevice`;
  }

  update(id: number, updateUserDeviceDto: UpdateUserDeviceDto) {
    return `This action updates a #${id} userDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDevice`;
  }
}
