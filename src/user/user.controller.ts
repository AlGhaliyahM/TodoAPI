import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Delete,
  Res,
  Put,
  HttpCode,
  Param,
} from '@nestjs/common';
//import { Request, Response } from 'express';
import { User } from './user.entity';
import { UsersService } from './user.service';
//import jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('signin')
  async signIn(@Body() user: User) {
    return this.usersService.signIn(user);
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.usersService.signUp(user);
  }
}
