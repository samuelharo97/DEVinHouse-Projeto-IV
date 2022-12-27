import { IsIP, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeviceInfoDto {
  @IsOptional()
  @IsString()
  virtual_id: string;

  @IsOptional()
  @IsIP()
  ip_address: string;

  @IsOptional()
  @IsString()
  mac_address: string;

  @IsOptional()
  @IsNumber()
  signal: number;
}
