import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request as typeormReq,
  /* Request, */
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('userDevices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @typeormReq() request,
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
  @Get('/all')
  async findUserDevices(@typeormReq() request) {
    console.log(request.user['id']);
    return await this.userDevicesService.findUserDevices(request.user['id']);
  }

  @Get('/details/:id')
  async deviceDetails(@Param('id') param: string) {
    return await this.userDevicesService.findOne(param);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDeviceDto: UpdateUserDeviceDto,
  ) {
    return this.userDevicesService.update(+id, updateUserDeviceDto);
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
