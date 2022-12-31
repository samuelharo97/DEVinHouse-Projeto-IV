import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Local } from '../../user-devices/enum/location.enum';

export class DeviceSettingsDto {
  @IsNotEmpty()
  @IsBoolean()
  is_on: boolean;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsEnum(Local)
  location: Local;
}
