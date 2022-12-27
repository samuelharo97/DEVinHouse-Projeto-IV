import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';
import { DeviceSettingsDto } from './device-settings.dto';

export class CreateUserDeviceDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  device_id: number;

  @ValidateNested({ each: true })
  @IsObject()
  @Type(() => DeviceSettingsDto)
  settings: DeviceSettingsDto;

  @ValidateNested({ each: true })
  @IsObject()
  @Type(() => DeviceInfoDto)
  info: DeviceInfoDto;
}
