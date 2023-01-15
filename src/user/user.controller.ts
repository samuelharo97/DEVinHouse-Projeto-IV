import {
  Controller,
  Get,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/core/auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /* @Get()
  async findAll() {
    return this.userService.findAll();
  } */

  @Get('/locals')
  locals() {
    try {
      return this.userService.getLocals();
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  modifyPassword(
    @Req() request: Request,
    @Param('id') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      this.authService.verifyUser(request.user['id'], userId);

      return this.authService.modifyPassword(changePasswordDto);
    } catch (error) {
      throw error;
    }
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
  ): Promise<any> {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      const response = await this.userService.update(userId, updateUserDto);

      return { message: 'user updated successfully', user: response };
    } catch (error) {
      throw error;
    }
  }

  @Patch('/block/:id')
  block(@Req() request: Request, @Param('id') userId: string) {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      return this.userService.block(userId);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/unblock/:id')
  unblock(@Req() request: Request, @Param('id') userId: string) {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      return this.userService.unblock(userId);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  remove(@Req() request: Request, @Param('id') userId: string) {
    try {
      this.authService.verifyUser(request.user['id'], userId);
      return this.userService.remove(userId);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
