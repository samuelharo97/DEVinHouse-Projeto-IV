import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { DeviceInfoDto } from './device-info.dto';

export class CreateDeviceDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  madeBy: string;

  @IsNotEmpty()
  photoUrl: string;

  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => DeviceInfoDto)
  info: DeviceInfoDto;
}
