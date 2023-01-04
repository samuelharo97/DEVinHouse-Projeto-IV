import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIP, IsOptional, IsString } from 'class-validator';

export class DeviceInfoDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  virtual_id: string;

  @IsOptional()
  @IsIP()
  @ApiPropertyOptional()
  ip_address: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  mac_address: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  signal: string;
}
