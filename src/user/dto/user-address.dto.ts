import { IsString, MaxLength, MinLength } from 'class-validator';

export class userAddressDto {
  @IsString()
  zipCode: string;

  @IsString()
  street: string;

  @IsString()
  number: number;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  complement?: string;
}
