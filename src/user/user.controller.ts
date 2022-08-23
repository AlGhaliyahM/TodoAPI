import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() user: User) {
    //want to generate token here
    //return this.userService.generateAccessToken(user);
    return this.authService.login(user);
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    await this.userService.signUp(user);
    console.log('signup is done');
    return this.login(user);
  }
}
