/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsImageUrl } from 'src/core/constraints/url.decorator';

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  @ApiProperty()
  madeBy: string;

  @IsNotEmpty()
  @IsImageUrl({ message: 'photoUrl needs to be a link leading to an image' })
  @ApiProperty()
  photoUrl: string;
}
