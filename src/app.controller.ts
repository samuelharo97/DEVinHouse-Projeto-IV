import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.signUp(createUserDto);

    return newUser;
  }
}
