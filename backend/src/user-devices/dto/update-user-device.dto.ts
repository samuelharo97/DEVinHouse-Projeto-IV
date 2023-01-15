import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Local } from '../enum/location.enum';

export class UpdateUserDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  virtual_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIP()
  ip_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(-100)
  signal: number;

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
