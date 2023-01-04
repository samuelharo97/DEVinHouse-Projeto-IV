import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Device } from 'src/device/entities/device.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
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

  async create(userPayload: JwtPayloadUser, dto: CreateUserDeviceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { device_id, info, settings } = dto;

        /* const user: User = await this.userRepo.findOne({
          where: { id: userId },
        }); */

        const user = this.userRepo.create(userPayload);

        if (!user) {
          throw new NotFoundException();
        }

        const device: Device = await this.deviceRepo.findOne({
          where: { _id: device_id },
        });

        if (!device) {
          throw new NotFoundException();
        }

        const deviceInstance = this.userDeviceRepo.create(); // id property doesn't exist yet, only after save
        const deviceInfoInstance = this.infoRepo.create();
        const deviceSettingsInstance = this.settingsRepo.create();

        deviceInstance.device = device;

        deviceInstance.user = user;

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

        /* [user.devices, ...savedUserDevice.id]; */

        await this.userRepo.save(user);

        resolve(await this.userDeviceRepo.save(deviceInstance));
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll() {
    return await this.userDeviceRepo.find({
      relations: { settings: true, info: true },
    });
  }

  async findOne(deviceId: string) {
    const device = await this.userDeviceRepo.findOne({
      where: { id: deviceId },
      relations: { settings: true, info: true },
    });
    return device;
  }

  async findUserDevices(user: User): Promise<UserDevice[]> {
    /* Este query não funcionou. 
    'ERROR [ExceptionsHandler] Property "0" was not found in "User". 
    Make sure your query is correct.'

    const userDevices = await this.userDeviceRepo.find({
      where: { user: user },
      relations: ['info', 'settings'],
    }); 
    */

    const userDevices = await this.userDeviceRepo
      .createQueryBuilder('userDevice')
      .leftJoinAndSelect('userDevice.info', 'info')
      .leftJoinAndSelect('userDevice.settings', 'settings')
      .where('userDevice.user = :user', { user: user })
      .getMany();

    return userDevices;
  }

  getLocals() {
    const locals = [
      {
        _id: '631b34696f2d2f24a7c0c960',
        description: 'Casa',
      },
      {
        _id: '631b34796f2d2f24a7c0c961',
        description: 'Escritório',
      },
      {
        _id: '631b348a6f2d2f24a7c0c962',
        description: 'Fábrica',
      },
    ];
    return locals;
  }

  updateStatus(userDevice: string, setting: boolean) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.userDeviceRepo.findOne({
          where: { id: userDevice },
          relations: { settings: true, info: true },
        });

        if (!device) {
          throw new NotFoundException();
        }

        device.settings.is_on = setting;

        resolve(await this.userDeviceRepo.save(device));
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDevice = await this.userDeviceRepo.findOne({
          where: { id: id },
          relations: { info: true, settings: true },
        });

        if (!userDevice) {
          throw new NotFoundException();
        }
        const info = userDevice.info;
        const settings = userDevice.settings;

        await this.settingsRepo.remove(settings);
        await this.infoRepo.remove(info);
        await this.userDeviceRepo.remove(userDevice);

        resolve({ acknowledged: true, deletedCount: 1 });
      } catch (error) {
        reject(error);
      }
    });
  }
}
