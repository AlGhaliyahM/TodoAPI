import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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
  async login(
    @Body('email') Email: string,
    @Body('password') Password: string,
  ) {
    //want to generate token here
    console.log('login in is happening');
    return this.authService.login(await this.userService.findUser(Email));
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    await this.userService.signUp(user);
    console.log('signup is done');
    return this.login(user.email, user.password);
  }
}
