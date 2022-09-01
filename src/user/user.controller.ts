import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Headers,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    return this.authService.login(await this.userService.findUser(Email));
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    await this.userService.signUp(user);
    return this.login(user.email, user.password);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAccount(@Headers('email') email: string) {
    return this.userService.deleteAccount(email);
  }
}
