import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Local } from '../../user-devices/enum/location.enum';

export class DeviceSettingsDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  is_on: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  room: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Local, {
    message: 'location options: "Casa", "Escritório", "Fábrica"',
  })
  location: Local;
}
