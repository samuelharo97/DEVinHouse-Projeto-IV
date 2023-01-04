import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('/new')
  create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  findAll(): Promise<Device[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const devices = await this.deviceService.findAll();
        resolve(devices);
      } catch (error) {
        reject(error);
      }
    });
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: number) {
    const id = Number(_id);

    try {
      return await this.deviceService.findOne(id);
    } catch (error) {
      throw new HttpException(
        { message: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
