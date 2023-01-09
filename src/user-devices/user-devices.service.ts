import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Device } from 'src/device/entities/device.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { Repository } from 'typeorm';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
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

        const user = this.userRepo.create(userPayload);

        if (!user) {
          throw new NotFoundException({ message: `user not found` });
        }

        const device: Device = await this.deviceRepo.findOne({
          where: { _id: device_id },
        });

        if (!device) {
          throw new NotFoundException({ message: `device not found` });
        }

        const deviceInstance = this.userDeviceRepo.create(); // id property doesn't exist yet, only after save
        const deviceInfoInstance = this.infoRepo.create();
        const deviceSettingsInstance = this.settingsRepo.create();

        deviceInstance.device = device;

        deviceInstance.user = user;

        if (info && info.mac_address) {
          deviceInfoInstance.mac_address = info.mac_address;
        } else {
          deviceInfoInstance.mac_address = deviceInfoInstance.addMAC();
        }

        if (info && info.virtual_id) {
          deviceInfoInstance.virtual_id =
            info.virtual_id || deviceInfoInstance.addVirtual();
        }
        if (info && info.ip_address) {
          deviceInfoInstance.ip_address = info.ip_address || '127.0.0.1';
        }

        if (info && info.signal) {
          deviceInfoInstance.signal = `${info.signal}dBm` || '50dBm';
        }

        deviceSettingsInstance.is_on = settings.is_on;
        deviceSettingsInstance.location = settings.location;
        deviceSettingsInstance.room = settings.room;

        const savedSettings = await this.settingsRepo.save(
          deviceSettingsInstance,
        );

        const savedInfo = await this.infoRepo.save(deviceInfoInstance);

        deviceInstance.info = savedInfo;
        deviceInstance.settings = savedSettings;

        await this.userRepo.save(user);

        resolve(await this.userDeviceRepo.save(deviceInstance));
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(local: string) {
    if (local) {
      const userDevices = await this.userDeviceRepo
        .createQueryBuilder('userDevice')
        .leftJoinAndSelect('userDevice.info', 'info')
        .leftJoinAndSelect('userDevice.settings', 'settings')
        .where('settings.location ILIKE :local', {
          local: local,
        })
        .getMany();
      return userDevices;
    }

    return await this.userDeviceRepo.find({
      relations: { settings: true, info: true },
    });
  }

  async getUserDeviceDetails(userId: string, deviceId: string) {
    const device = await this.userDeviceRepo.findOne({
      where: { id: deviceId },
      relations: { settings: true, info: true, user: true },
    });

    if (userId != device.user.id) {
      throw new UnauthorizedException({
        description: `Access denied`,
        cause: `User ${userId} does not own device ${deviceId}, and therefore cannot GET details`,
      });
    }

    delete device.user;

    return device;
  }

  async findUserDevices(user: User, local: string): Promise<UserDevice[]> {
    let userDevices: UserDevice[];
    if (local) {
      userDevices = await this.userDeviceRepo
        .createQueryBuilder('userDevice')
        .leftJoinAndSelect('userDevice.info', 'info')
        .leftJoinAndSelect('userDevice.settings', 'settings')
        .where('settings.location ILIKE :local AND userDevice.user = :user', {
          local: local,
          user: user,
        })
        .getMany();
    } else {
      userDevices = await this.userDeviceRepo
        .createQueryBuilder('userDevice')
        .leftJoinAndSelect('userDevice.info', 'info')
        .leftJoinAndSelect('userDevice.settings', 'settings')
        .where('userDevice.user = :user', { user: user })
        .getMany();
    }

    return userDevices;
  }

  getLocals() {
    // temporary mock data
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

  updateStatus(userId: string, userDevice: string, setting: boolean) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.userDeviceRepo.findOne({
          where: { id: userDevice },
          relations: { settings: true, info: true },
        });

        if (!device) {
          throw new NotFoundException();
        }

        if (userId != device.user.id) {
          throw new UnauthorizedException({
            description: `Access denied`,
            cause: `User ${userId} does not own device ${device.id}, and therefore cannot update it`,
          });
        }

        device.settings.is_on = setting;

        await this.userDeviceRepo.save(device);

        resolve({ message: 'device successfully updated' });
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(deviceId: string, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.userDeviceRepo.findOne({
          where: { id: deviceId },
          relations: { info: true, settings: true, user: true },
        });

        if (!device) {
          throw new NotFoundException(`device id: ${deviceId} not found`);
        }

        if (userId != device.user.id) {
          throw new UnauthorizedException({
            description: `Access denied`,
            cause: `User ${userId} does not own device ${deviceId}, and therefore cannot delete it`,
          });
        }

        delete device.user;

        const info = device.info;
        const settings = device.settings;

        await this.settingsRepo.remove(settings);
        await this.infoRepo.remove(info);
        await this.userDeviceRepo.remove(device);

        resolve({ acknowledged: true, deletedCount: 1 });
      } catch (error) {
        reject(error);
      }
    });
  }
}
