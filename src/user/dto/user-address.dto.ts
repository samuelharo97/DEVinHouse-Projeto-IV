import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Matches,
} from 'class-validator';

export class userAddressDto {
  @ApiProperty()
  @Matches(/^[0-9]+$/, { message: `must be brazilian zipcode with no "-"` })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  complement?: string;
}
