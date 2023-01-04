import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('userDevices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() request,
    @Body() createUserDeviceDto: CreateUserDeviceDto,
  ) {
    const device = await this.userDevicesService.create(
      request.user,
      createUserDeviceDto,
    );
    return device;
  }

  @Get()
  findAll() {
    return this.userDevicesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async findUserDevices(@Request() request) {
    return await this.userDevicesService.findUserDevices(request.user['id']);
  }

  @Get('/details/:id')
  async deviceDetails(@Param('id') param: string) {
    try {
      const result = await this.userDevicesService.findOne(param);
      if (!result) {
        throw new BadRequestException();
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get('/locals')
  async locals() {
    return this.userDevicesService.getLocals();
  }

  @Patch(':id')
  async updateDeviceStatus(
    @Param('id') id: string,
    @Body() updateUserDeviceDto: UpdateUserDeviceDto,
  ) {
    return await this.userDevicesService.updateStatus(
      id,
      updateUserDeviceDto.is_on,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userDevicesService.remove(id);
    } catch (error) {
      return error;
    }
  }
}
