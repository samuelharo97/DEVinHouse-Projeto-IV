import { IsNotEmpty } from 'class-validator';

export class DeviceInfoDto {
  @IsNotEmpty()
  virtual_id: string;

  @IsNotEmpty()
  ip_address: string;

  @IsNotEmpty()
  mac_address: string;

  @IsNotEmpty()
  signal: string;
}
