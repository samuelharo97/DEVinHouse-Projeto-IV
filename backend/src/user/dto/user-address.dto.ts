import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Matches,
  Length,
  IsPositive,
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
  @Length(1, 50)
  street: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  number: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
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
  @Length(1, 30)
  @IsOptional()
  complement?: string;
}
