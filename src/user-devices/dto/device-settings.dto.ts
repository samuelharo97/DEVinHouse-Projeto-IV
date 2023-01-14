import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Local } from '../../user-devices/enum/location.enum';

export class DeviceSettingsDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  is_on: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Local)
  location: Local;
}
