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

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  //   @Post('signin')
  //   async signIn() {
  //     return this.usersService.signIn();
  //   }

  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.usersService.signUp(user);
  }
}
