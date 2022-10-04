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
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/user.decorator';
import { Response, Request } from 'express';
import { userDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(
    @Body() user: userDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    //Generate JWT
    const Token = await this.authService.login(
      await this.userService.findUser(user.email),
    );

    response.cookie('Token', Token.jwt, { httpOnly: true });
    return {
      message: 'Login Success',
    };
  }

  //sign up functionality
  @Post('signup')
  async signUp(@Body() user: userDTO) {
    return await this.userService.signUp(user);
    // return this.login(user.email);
  }

  //validates that access token is set to inform the front end that user is logged in
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
  //check responses
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAccount(@GetUser() user: any) {
    return this.userService.deleteAccount(user);
  }
  // move logic to service
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Token');

    return {
      message: 'Logged out successfully',
    };
  }
}
