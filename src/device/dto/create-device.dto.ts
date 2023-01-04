/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  madeBy: string;

  @IsNotEmpty()
  @ApiProperty()
  photoUrl: string;
}
