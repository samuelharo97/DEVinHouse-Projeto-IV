import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateDeviceStatus {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  is_on: boolean;
}
