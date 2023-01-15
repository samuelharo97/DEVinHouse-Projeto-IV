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
  HttpStatus,
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/core/auth/auth.service';
import { UpdateDeviceStatus } from './dto/update-device-status.dto';

@ApiTags('user devices')
@UseGuards(JwtAuthGuard)
@Controller('user-devices')
export class UserDevicesController {
  constructor(
    private readonly userDevicesService: UserDevicesService,
    private readonly authService: AuthService,
  ) {}

  @Post(':userId')
  async create(
    @Request() request,
    @Param('userId') userId: string,
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

  @Get('/:userId')
  async findUserDevices(
    @Request() request,
    @Param('userId') userId: string,
    @Query('local') local: string,
  ) {
    this.authService.verifyUser(request.user['id'], userId);
    const response = await this.userDevicesService.findUserDevices(
      request.user['id'],
      local,
    );
    if (!response) {
      throw new NotFoundException(`No user with ID: ${userId}`);
    }
    return response;
  }

  @Get('/details/:userDeviceId')
  async deviceDetails(
    @Request() request,
    @Param('userDeviceId') deviceId: string,
  ) {
    try {
      const response = await this.userDevicesService.getUserDeviceDetails(
        request.user.id,
        deviceId,
      );
      if (!response) {
        throw new NotFoundException(`No device with ID: ${deviceId}`);
      }
      return response;
    } catch (error) {
      if (error.message == '401') {
        throw new HttpException(
          `User ${request.user.id} does not own device ${deviceId}, and therefore cannot GET details`,
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw error;
    }
  }

  @Patch(':userDeviceId')
  async updateDeviceStatus(
    @Request() request,
    @Param('userDeviceId') deviceId: string,
    @Body() dto: UpdateDeviceStatus,
  ) {
    try {
      const response = await this.userDevicesService.updateStatus(
        request.user['id'],
        deviceId,
        dto.is_on,
      );

      if (!response) {
        throw new NotFoundException(`No device with ID: ${deviceId}`);
      }

      return response;
    } catch (error) {
      if (error.message == '401') {
        throw new UnauthorizedException({
          statusCode: 401,
          description: `Access denied`,
          cause: `User ${request.user['id']} does not own device ${deviceId}, and therefore cannot update it`,
        });
      }
      throw error;
    }
  }

  @Put(':userDeviceId')
  async updateUserDevice(
    @Request() request,
    @Param('userDeviceId') deviceId: string,
    @Body() dto: UpdateUserDeviceDto,
  ) {
    try {
      const response = await this.userDevicesService.update(
        request.user['id'],
        deviceId,
        dto,
      );

      if (!response) {
        throw new NotFoundException({
          statusCode: 404,
          message: `device id: ${deviceId} not found`,
        });
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':userDeviceId')
  async remove(@Request() request, @Param('userDeviceId') deviceId: string) {
    try {
      const response = await this.userDevicesService.remove(
        deviceId,
        request.user['id'],
      );

      if (!response) {
        throw new NotFoundException({
          statusCode: 404,
          message: `device id: ${deviceId} not found`,
        });
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
