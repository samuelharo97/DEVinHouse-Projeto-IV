import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmptyObject,
  IsObject,
  IsString,
  MaxLength,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
  Length,
} from 'class-validator';
import { IsImageUrl } from 'src/core/constraints/url.decorator';
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
  @Length(3, 60)
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsImageUrl({ message: 'photo URL must lead to an image' })
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
