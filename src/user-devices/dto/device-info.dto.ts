import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIP,
  IsMACAddress,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class DeviceInfoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  virtual_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIP()
  ip_address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsMACAddress()
  mac_address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(-100)
  signal: number;
}
