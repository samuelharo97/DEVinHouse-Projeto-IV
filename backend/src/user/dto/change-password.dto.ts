import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'old_password must contain: letters, numbers and special characters',
  })
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  old_password: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'new_password must contain: letters, numbers and special characters',
  })
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  new_password: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'confirm_password must contain: letters, numbers and special characters',
  })
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(30)
  @Match('new_password')
  confirm_password: string;
}
