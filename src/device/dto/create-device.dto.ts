/* eslint-disable @typescript-eslint/no-unused-vars */
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
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  madeBy: string;

  @IsNotEmpty()
  photoUrl: string;

  /* @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => DeviceInfoDto)
  info: DeviceInfoDto; */
}
