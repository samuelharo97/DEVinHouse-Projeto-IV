import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeviceInfo } from 'src/user-devices/entities/info.entity';
import { DeviceSettings } from 'src/user-devices/entities/settings.entity';
import { UserDevice } from 'src/user-devices/entities/user.devices.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepo: Repository<Address>,
    @Inject('USER_DEVICE_REPOSITORY')
    private userDeviceRepo: Repository<UserDevice>,
    @Inject('INFO_REPOSITORY')
    private infoRepo: Repository<DeviceInfo>,
    @Inject('SETTINGS_REPOSITORY')
    private settingsRepo: Repository<DeviceSettings>,
  ) {}

  async findAll() {
    const users = await this.userRepo.find({
      /* where: { is_active: true }, */
      relations: {
        userAddress: true,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        photoUrl: true,
        phone: true,
      },
    });
    const filteredUsers = users.map((user) => {
      if (!user.phone) {
        delete user.phone;
      }
      return user;
    });
    return filteredUsers;
  }

  findOne(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            id: userId,
          },
          relations: { userAddress: true },
        });

        if (!user) {
          throw new NotFoundException(`no user with ID: ${userId}`);
        }

        if (!user.phone) {
          delete user.phone;
        }
        delete user.salt;
        delete user.password;

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: { id: userId },
          relations: { userAddress: true },
        });

        const { fullName, email, phone, photoUrl, userAddress } = updateUserDto;
        const {
          city,
          neighborhood,
          state,
          zipCode,
          number,
          street,
          complement,
        } = userAddress;

        user.email = email || user.email;
        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;
        user.photoUrl = photoUrl || user.photoUrl;
        user.userAddress.city = city || user.userAddress.city;
        user.userAddress.complement = complement || user.userAddress.complement;
        user.userAddress.neighborhood =
          neighborhood || user.userAddress.neighborhood;
        user.userAddress.number = number || user.userAddress.number;
        user.userAddress.state = state || user.userAddress.state;
        user.userAddress.street = street || user.userAddress.street;
        user.userAddress.zipCode = zipCode || user.userAddress.zipCode;

        const updatedUser = await this.userRepo.save(user);

        delete updatedUser.password;
        delete updatedUser.salt;

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
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

  block(param: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOneBy({
          id: param,
        });

        user.is_active = false;

        this.userRepo.save(user);

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  unblock(param: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOneBy({
          id: param,
        });

        user.is_active = true;

        this.userRepo.save(user);

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOne({
          where: {
            id: id,
          },
          relations: {
            userAddress: true,
            devices: true,
          },
        });

        if (!user) {
          throw new NotFoundException();
        }

        const userDevices = await this.userDeviceRepo
          .createQueryBuilder('userDevice')
          .leftJoinAndSelect('userDevice.info', 'info')
          .leftJoinAndSelect('userDevice.settings', 'settings')
          .where('userDevice.user = :user', { user: user.id })
          .getMany();

        const address = user.userAddress;
        const info = userDevices.map((device) => device.info);
        const settings = userDevices.map((device) => device.settings);
        const devices = user.devices;

        await this.infoRepo.remove(info);
        await this.settingsRepo.remove(settings);
        await this.userDeviceRepo.remove(devices);
        await this.addressRepo.remove(address);
        await this.userRepo.remove(user);
        // --------------------------------------------------------------

        resolve({ acknowledged: true, deletedCount: 1 });
      } catch (error) {
        reject(error);
      }
    });
  }
}
