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
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
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
      throw new UnauthorizedException({
        success: false,
        message:
          'Error: The email in the request does not match the email of the logged-in user.',
      });
    }
    return this.authService.modifyPassword(changePasswordDto);
  }

  @Get('/:id')
  async findOne(@Req() request: Request, @Param('id') userId: string) {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      const response = await this.userService.findOne(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Req() request: Request,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      return await this.userService.update(userId, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/block/:id')
  block(@Req() request: Request, @Param('id') userId: string) {
    this.authService.verifyUser(request.user['id'], userId);
    return this.userService.block(userId);
  }

  @Patch('/unblock/:id')
  unblock(@Req() request: Request, @Param('id') userId: string) {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      return this.userService.unblock(userId);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  remove(@Req() request: Request, @Param('id') userId: string) {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      return this.userService.remove(userId);
    } catch (error) {
      throw error;
    }
  }
}
