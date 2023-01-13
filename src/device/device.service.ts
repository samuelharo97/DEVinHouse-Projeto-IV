import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('DEVICE_REPOSITORY')
    private deviceRepo: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return new Promise<Device>(async (resolve, reject) => {
      try {
        const { type, madeBy, name, photoUrl } = createDeviceDto;

        const newDevice = this.deviceRepo.create();

        newDevice.name = name;
        newDevice.photoUrl = photoUrl;
        newDevice.type = type;
        newDevice.madeBy = madeBy;

        const device = await this.deviceRepo.save(newDevice);

        resolve(device);
      } catch (error) {
        reject(error);
      }
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
        rej(err);
      }
    });
  }

  update(deviceId: any, dto: UpdateDeviceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const device = await this.deviceRepo.findOne({
          where: { _id: deviceId },
        });
        const { madeBy, name, photoUrl, type } = dto;

        device.madeBy = madeBy;
        device.name = name;
        device.photoUrl = photoUrl;
        device.type = type;
        resolve(await this.deviceRepo.save(device));
      } catch (error) {
        reject(error);
      }
    });
  }

  async remove(id: number) {
    const device = await this.deviceRepo.findOne({ where: { _id: id } });

    if (!device) {
      throw new NotFoundException();
    }

    await this.deviceRepo.remove(device);

    return { message: 'device removed from database' };
  }
}
