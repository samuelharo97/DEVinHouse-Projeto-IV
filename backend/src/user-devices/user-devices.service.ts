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

        const deviceInstance = this.userDeviceRepo.create();
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
          deviceInfoInstance.virtual_id = info.virtual_id;
        } else {
          deviceInfoInstance.virtual_id = deviceInfoInstance.addVirtual();
        }

        if (info && info.ip_address) {
          deviceInfoInstance.ip_address = info.ip_address;
        }

        if (info && info.signal) {
          deviceInfoInstance.signal = `${info.signal}dBm`;
        } else {
          deviceInfoInstance.signal = '50dBm';
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
        await this.userDeviceRepo.save(deviceInstance);
        resolve({
          success: true,
          message: `Device ${deviceInstance.device.name} successfully acquired by user ID: ${userPayload.id}`,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async findAll(local: string): Promise<UserDevice[]> {
    if (local) {
      const userDevices = await this.userDeviceRepo
        .createQueryBuilder('userDevice')
        .leftJoinAndSelect('userDevice.info', 'info')
        .leftJoinAndSelect('userDevice.settings', 'settings')
        .where(
          // Eu tinha feito com unaccent() porém o postgres gratuido do render.com não tem a extensão
          // update: consegui instalar a extensão no render, comando de instalação: 'CREATE EXTENSION IF NOT EXISTS unaccent;'
          // caso não funcione usar na linha abaixo: 'settings.location ILIKE :local'
          'unaccent(settings.location) ILIKE unaccent(:local)',
          {
            local: local,
          },
        )
        .getMany();
      return userDevices;
    }

    return await this.userDeviceRepo.find({
      relations: { settings: true, info: true },
    });
  }

  async getUserDeviceDetails(userId: string, deviceId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.userDeviceRepo.findOne({
          where: { id: deviceId },
          relations: { settings: true, info: true, user: true },
        });

        if (userId != device.user.id) {
          throw new Error(`401`);
        }

        delete device.user;

        resolve(device);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findUserDevices(user: User, local: string): Promise<UserDevice[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let userDevices: UserDevice[];
        if (local) {
          userDevices = await this.userDeviceRepo
            .createQueryBuilder('userDevice')
            .leftJoinAndSelect('userDevice.info', 'info')
            .leftJoinAndSelect('userDevice.settings', 'settings')
            .where(
              // caso ocorra erro no unaccent(),
              // instalar extensão do postgres com o comando: 'CREATE EXTENSION IF NOT EXISTS unaccent;'
              // ou trocar a linha abaixo por 'settings.location ILIKE :local AND userDevice.user = :user'
              `unaccent(settings.location) ILIKE unaccent(:local) AND userDevice.user = :user`,
              {
                local: local,
                user: user,
              },
            )
            .getMany();
        } else {
          userDevices = await this.userDeviceRepo
            .createQueryBuilder('userDevice')
            .leftJoinAndSelect('userDevice.info', 'info')
            .leftJoinAndSelect('userDevice.settings', 'settings')
            .where('userDevice.user = :user', { user: user })
            .getMany();
        }

        resolve(userDevices);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateStatus(
    userId: string,
    userDevice: string,
    setting: boolean,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.userDeviceRepo.findOne({
          where: { id: userDevice },
          relations: { settings: true, info: true, user: true },
        });

        if (!device) {
          return device;
        }

        if (userId != device.user.id) {
          throw new Error('401');
        }

        device.settings.is_on = setting;

        await this.userDeviceRepo.save(device);

        resolve({ message: 'device successfully updated' });
      } catch (error) {
        reject(error);
      }
    });
  }

  update(
    userId: string,
    deviceId: string,
    dto: UpdateUserDeviceDto,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { ip_address, is_on, location, room, signal, virtual_id } = dto;

        const device = await this.userDeviceRepo.findOne({
          where: { id: deviceId },
          relations: { info: true, settings: true, user: true },
        });

        if (!device) {
          throw new NotFoundException({
            message: `device id: ${deviceId} not found`,
          });
        }

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {
          throw new NotFoundException({ message: 'user not found' });
        }

        device.settings.is_on = is_on;
        device.settings.location = location;
        device.settings.room = room;
        device.info.ip_address = ip_address;
        device.info.signal = `${signal}dBm`;
        device.info.virtual_id = virtual_id;

        await this.userDeviceRepo.save(device);

        delete device.user;

        resolve({ message: 'device successfully updated' });
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(deviceId: string, userId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.userDeviceRepo.findOne({
          where: { id: deviceId },
          relations: { info: true, settings: true, user: true },
        });

        if (!device) {
          throw new NotFoundException({
            message: `device id: ${deviceId} not found`,
          });
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
