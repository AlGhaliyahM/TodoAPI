import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../auth/auth/auth.strategy';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() user: User) {
    //want to generate token here
    return this.userService.generateAccessToken(user);
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    await this.userService.signUp(user);
    console.log('signup is done');
    return this.login(user);
  }
}
