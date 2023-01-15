import { Controller, Get } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';

import { Device } from './entities/device.entity';

//Every ADMIN endpoint is disabled in deployed version

@ApiTags('devices')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  /*   @ApiProperty({ description: 'creates new device' })
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceService.create(createDeviceDto);
  } */

  @ApiProperty({ description: 'returns all available devices' })
  @Get()
  async findAll(): Promise<Device[]> {
    try {
      const devices = await this.deviceService.findAll();
      return devices;
    } catch (error) {
      throw error;
    }
  }

  /*   @ApiProperty({ description: 'finds one device by :id' })
  @Get(':id')
  async findOne(@Param('id') _id: number): Promise<Device> {
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

  @ApiProperty({ description: 'finds and updates a device by :id' })
  @Put(':id')
  async update(@Param('id') deviceId: string, @Body() dto: UpdateDeviceDto) {
    try {
      const device = await this.deviceService.update(+deviceId, dto);
      return device;
    } catch (error) {
      throw error;
    }
  }

  @ApiProperty({ description: 'finds and deletes a device by :id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  } */
}
