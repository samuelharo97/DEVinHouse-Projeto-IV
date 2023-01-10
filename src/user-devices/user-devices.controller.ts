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
  Put,
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/core/auth/auth.service';
import { UpdateDeviceStatus } from './dto/update-device-status.dto';

@ApiTags('user devices')
@UseGuards(JwtAuthGuard)
@Controller('userDevices')
export class UserDevicesController {
  constructor(
    private readonly userDevicesService: UserDevicesService,
    private readonly authService: AuthService,
  ) {}

  @Post(':id')
  async create(
    @Request() request,
    @Param('id') userId: string,
    @Body() createUserDeviceDto: CreateUserDeviceDto,
  ) {
    this.authService.verifyUser(request.user['id'], userId);
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

  @Get('/:id')
  async findUserDevices(
    @Request() request,
    @Param('id') userId: string,
    @Query('local') local: string,
  ) {
    this.authService.verifyUser(request.user['id'], userId);
    return await this.userDevicesService.findUserDevices(
      request.user['id'],
      local,
    );
  }

  @Get('/details/:deviceId')
  async deviceDetails(@Request() request, @Param('deviceId') param: string) {
    try {
      const result = await this.userDevicesService.getUserDeviceDetails(
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

  @Patch(':id')
  async updateDeviceStatus(
    @Request() request,
    @Param('id') deviceId: string,
    @Body() dto: UpdateDeviceStatus,
  ) {
    try {
      return await this.userDevicesService.updateStatus(
        request.user['id'],
        deviceId,
        dto.is_on,
      );
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateUserDevice(
    @Request() request,
    @Param('id') deviceId: string,
    @Body() dto: UpdateUserDeviceDto,
  ) {
    try {
      return await this.userDevicesService.update(
        request.user['id'],
        deviceId,
        dto,
      );
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Request() request, @Param('id') deviceId: string) {
    try {
      return await this.userDevicesService.remove(deviceId, request.user['id']);
    } catch (error) {
      return error;
    }
  }
}
