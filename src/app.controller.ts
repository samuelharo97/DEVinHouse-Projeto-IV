import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/entities/user.entity';
@ApiTags('authentication')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/register')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.authService.signUp(createUserDto);

      return newUser;
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/auth/login')
  async signIn(@Body() credentials: CredentialsDTO) {
    try {
      const responseToken = await this.authService.signIn(credentials);

      return responseToken;
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
