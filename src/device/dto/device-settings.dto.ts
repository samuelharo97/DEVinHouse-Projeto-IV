import { IsEnum, IsNotEmpty } from 'class-validator';
import { Local } from '../enum/location.enum';

export class DeviceSettingsDto {
  @IsNotEmpty()
  is_on: boolean;

  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  @IsEnum(Local)
  location: Local;
}
