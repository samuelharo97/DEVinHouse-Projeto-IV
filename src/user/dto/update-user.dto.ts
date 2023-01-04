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
  photoUrl?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => userAddressDto)
  userAddress: userAddressDto;
}
