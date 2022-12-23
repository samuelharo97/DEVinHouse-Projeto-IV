import {
  Controller,
  Get,
  Put,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/core/auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Patch('/change-password')
  modifyPassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.modifyPassword(changePasswordDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch('/block/:id')
  block(@Param('id') id: string) {
    return this.userService.toggleBlock(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
