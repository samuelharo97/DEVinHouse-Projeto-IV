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
  Query,
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user devices')
@UseGuards(JwtAuthGuard)
@Controller('userDevices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

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
  findAll(@Query('local') local: string) {
    return this.userDevicesService.findAll(local);
  }

  @Get('/user')
  async findUserDevices(@Request() request, @Query('local') local: string) {
    return await this.userDevicesService.findUserDevices(
      request.user['id'],
      local,
    );
  }

  @Get('/details/:deviceId')
  async deviceDetails(@Request() request, @Param('deviceId') param: string) {
    try {
      const result = await this.userDevicesService.findOne(
        request.user.id,
        param,
      );
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
  async remove(@Request() request, @Param('id') id: string) {
    try {
      return await this.userDevicesService.remove(id, request.user['id']);
    } catch (error) {
      return error;
    }
  }
}
