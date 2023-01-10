import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmptyObject,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  IsPhoneNumber,
  Matches,
  IsUrl,
} from 'class-validator';
import { userAddressDto } from './user-address.dto';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @Matches(/\.(jpe?g|png|gif)$/, {
    message:
      'photoUrl must be a link ending in either: .jpeg / .jpg / .png / .gif',
  })
  @IsUrl()
  photoUrl?: string;

  @IsString()
  @ApiProperty()
  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => userAddressDto)
  userAddress: userAddressDto;
}
