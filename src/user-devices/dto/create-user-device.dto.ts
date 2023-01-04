import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';
import { DeviceSettingsDto } from './device-settings.dto';

export class CreateUserDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  device_id: number;

  @ValidateNested({ each: true })
  @IsObject()
  @ApiProperty()
  @Type(() => DeviceSettingsDto)
  settings: DeviceSettingsDto;

  @ValidateNested({ each: true })
  @ApiProperty()
  @IsOptional()
  @IsObject()
  @Type(() => DeviceInfoDto)
  info: DeviceInfoDto;
}
