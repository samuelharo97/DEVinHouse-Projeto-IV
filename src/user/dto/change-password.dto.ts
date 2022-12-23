import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class ChangePasswordDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  old_password: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  new_password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Match('new_password')
  @IsNotEmpty()
  confirm_password: string;
}