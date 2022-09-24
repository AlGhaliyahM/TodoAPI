import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/user.decorator';
import { Response, Request } from 'express';

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
    @Res({ passthrough: true }) response: Response,
  ) {
    //Generate JWT
    const Token = await this.authService.login(
      await this.userService.findUser(Email),
    );

    response.cookie('Token', Token.jwt, { httpOnly: true });
    return {
      message: 'success',
    };
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.userService.signUp(user);
    // return this.login(user.email);
  }

  @Get()
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['Token'];
      const data = await this.authService.verifyAsync(cookie);
      return { data, cookie };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAccount(@GetUser() user: any) {
    return this.userService.deleteAccount(user);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Token');

    return {
      message: 'Logged out successfully',
    };
  }
}

// @Get()
// async findAll() {
//   return this.userService.findAll();
// }
