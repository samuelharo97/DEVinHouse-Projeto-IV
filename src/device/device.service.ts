import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FindOneDto } from './dto/find-one.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { DeviceInfo } from './entities/info.entity';
import { DeviceSettings } from './entities/settings.entity';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('DEVICE_REPOSITORY')
    private deviceRepo: Repository<Device>,

    @Inject('SETTINGS_REPOSITORY')
    private settingsRepo: Repository<DeviceSettings>,

    @Inject('INFO_REPOSITORY')
    private infoRepo: Repository<DeviceInfo>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return new Promise<Device>(async (resolve) => {
      const { type, madeBy, name, photoUrl } = createDeviceDto;

      const newDevice = this.deviceRepo.create();

      newDevice.name = name;
      newDevice.photoUrl = photoUrl;
      newDevice.type = type;
      newDevice.madeBy = madeBy;

      const device = await this.deviceRepo.save(newDevice);

      resolve(device);
    });
  }

  async findAll() {
    const devices = await this.deviceRepo.find();
    return devices;
  }

  async findOne(id: number): Promise<Device> {
    return new Promise(async (res, rej) => {
      try {
        const device = await this.deviceRepo.findOneByOrFail({
          _id: Number(id),
        });
        res(device);
      } catch (err) {
        res(err);
      }
    });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
