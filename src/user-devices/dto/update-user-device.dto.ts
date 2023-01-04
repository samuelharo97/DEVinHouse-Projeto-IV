import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserDeviceDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  is_on: boolean;
}
