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
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './entities/device.entity';

@ApiTags('devices')
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiProperty({ description: 'creates new device' })
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.create(createDeviceDto);
  }

  @ApiProperty({ description: 'returns all available devices' })
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

  @ApiProperty({ description: 'finds one device by :id' })
  @Get(':id')
  async findOne(@Param('id') _id: number) {
    const id = Number(_id);
    try {
      return await this.deviceService.findOne(id);
    } catch (error) {
      throw new HttpException(
        { message: `no device with id: ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @ApiProperty({ description: 'finds and deletes one device by :id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
