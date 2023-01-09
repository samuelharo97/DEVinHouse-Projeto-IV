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
  Matches,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';
import { userAddressDto } from './user-address.dto';

export class CreateUserDto {
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
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Password must contain: letters, numbers and special characters',
  })
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Match('password')
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty()
  @IsString()
  photoUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => userAddressDto)
  userAddress: userAddressDto;
}
