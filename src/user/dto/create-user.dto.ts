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
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';
import { userAddressDto } from './user-address.dto';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Match('password')
  @IsNotEmpty()
  confirm_password: string;

  @IsString()
  photoUrl?: string;

  @IsString()
  phone: string;

  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => userAddressDto)
  userAddress: userAddressDto;
}
