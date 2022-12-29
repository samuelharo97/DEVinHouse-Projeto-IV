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
  @IsNotEmpty()
  device_id: number;

  @ValidateNested({ each: true })
  @IsObject()
  @Type(() => DeviceSettingsDto)
  settings: DeviceSettingsDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsObject()
  @Type(() => DeviceInfoDto)
  info: DeviceInfoDto;
}
