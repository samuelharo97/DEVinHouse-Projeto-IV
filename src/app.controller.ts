import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/register')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.signUp(createUserDto);

    return newUser;
  }

  @Post('/auth/login')
  async signIn(@Body() credentials: CredentialsDTO) {
    const responseToken = await this.authService.signIn(credentials);

    return responseToken;
  }
}
