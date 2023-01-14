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

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @Type(() => DeviceSettingsDto)
  settings: DeviceSettingsDto;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsOptional()
  @IsObject()
  @Type(() => DeviceInfoDto)
  info: DeviceInfoDto;
}
