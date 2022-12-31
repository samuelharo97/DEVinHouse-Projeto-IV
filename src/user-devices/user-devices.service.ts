import { Inject, Injectable } from '@nestjs/common';
import { Device } from 'src/device/entities/device.entity';
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
    @Inject('DEVICE_REPOSITORY')
    private deviceRepo: Repository<Device>,
  ) {}

  async create(userId: string, dto: CreateUserDeviceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { device_id, info, settings } = dto;

        const user: User = await this.userRepo.findOne({
          where: { id: userId },
        });

        const device: Device = await this.deviceRepo.findOne({
          where: { _id: device_id },
        });

        const deviceInstance = this.userDeviceRepo.create(); // id property doesn't exist yet, only after save
        const deviceInfoInstance = this.infoRepo.create();
        const deviceSettingsInstance = this.settingsRepo.create();

        deviceInstance.device = device;
        deviceInstance.user_id = userId;

        deviceInfoInstance.mac_address
          ? (deviceInfoInstance.mac_address = info.mac_address)
          : (deviceInfoInstance.mac_address = deviceInfoInstance.addMAC());

        deviceInfoInstance.virtual_id
          ? (deviceInfoInstance.virtual_id = info.virtual_id)
          : (deviceInfoInstance.virtual_id = deviceInfoInstance.addVirtual());

        deviceInfoInstance.ip_address
          ? (deviceInfoInstance.ip_address = info.ip_address)
          : (deviceInfoInstance.ip_address = '127.0.0.1');

        deviceInfoInstance.signal
          ? (deviceInfoInstance.signal = info.signal)
          : (deviceInfoInstance.signal = null);

        deviceSettingsInstance.is_on = settings.is_on;
        deviceSettingsInstance.location = settings.location;
        deviceSettingsInstance.room = settings.room;

        const savedSettings = await this.settingsRepo.save(
          deviceSettingsInstance,
        );

        const savedInfo = await this.infoRepo.save(deviceInfoInstance);

        deviceInstance.info = savedInfo;
        deviceInstance.settings = savedSettings;

        const savedUserDevice = await this.userDeviceRepo.save(deviceInstance);
        user.addUserDeviceId(
          savedUserDevice.id,
        ); /* [user.devices, ...savedUserDevice.id]; */

        await this.userRepo.save(user);

        resolve(savedUserDevice);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll() {
    return await this.userDeviceRepo.find();
  }

  async findOne(deviceId: string) {
    const device = await this.userDeviceRepo.findOne({
      where: { id: deviceId },
    });

    return device;
  }

  async findUserDevices(userId: string) {
    const devices = await this.userDeviceRepo.find({
      where: { user_id: userId },
    });

    /*     const userDevices = devices.filter((device) => device.user_id == userId);
     */
    return devices;
  }

  update(id: number, updateUserDeviceDto: UpdateUserDeviceDto) {
    return `This action updates a #${id} userDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDevice`;
  }
}
