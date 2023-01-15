/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsImageUrl } from 'src/core/constraints/url.decorator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  madeBy: string;

  @IsNotEmpty()
  @IsImageUrl({ message: 'photoUrl needs to be a link leading to an image' })
  @ApiProperty()
  photoUrl: string;
}
