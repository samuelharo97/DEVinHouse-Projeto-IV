import {
  Controller,
  Get,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/core/auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';

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
  modifyPassword(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    if (request.user['email'] != changePasswordDto.email) {
      throw new UnauthorizedException();
    }

    return this.authService.modifyPassword(changePasswordDto);
  }

  @Get('/:id')
  findOne(@Req() request: Request, @Param('id') param: string) {
    return this.userService.findOne(param);
  }

  @Put()
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(request.user['id'], updateUserDto);
  }

  @Patch('/block/:id')
  block(@Param('id') id: string) {
    return this.userService.block(id);
  }

  @Patch('/unblock/:id')
  unblock(@Param('id') id: string) {
    return this.userService.unblock(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
