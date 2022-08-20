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

import { Request, Response } from 'express';
import { User } from './user.entity';
import { UsersService } from './user.service';

import jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //   @Post('signin')
  //   async signIn() {
  //     return this.usersService.signIn();
  //   }

  @Post('signup')
  async signUp(@Body() user: User): Promise<User> {
    const test = await this.usersService.signUp(user);
    return test;
  }
}
