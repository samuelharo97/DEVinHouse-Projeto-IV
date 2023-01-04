import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserDeviceDto {
  @IsBoolean()
  @IsNotEmpty()
  is_on: boolean;
}
