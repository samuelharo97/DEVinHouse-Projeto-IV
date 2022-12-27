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
} from '@nestjs/common';
import { UserDevicesService } from './user-devices.service';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { UpdateUserDeviceDto } from './dto/update-user-device.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('user-devices')
export class UserDevicesController {
  constructor(private readonly userDevicesService: UserDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: Request,
    @Body() createUserDeviceDto: CreateUserDeviceDto,
  ) {
    return this.userDevicesService.create(
      request.user['id'],
      createUserDeviceDto,
    );
  }

  @Get()
  findAll() {
    return this.userDevicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDevicesService.findOne(+id);
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
    return this.userDevicesService.remove(+id);
  }
}
