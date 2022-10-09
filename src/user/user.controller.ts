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
import { userRegisterDTO } from './userRegister.dto';
import { userLoginDTO } from './userLogin.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  // services available
  // login, register, delete user, logout, validate access token
  //Password is missing
  //should return a success message not return the user
  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(
    @Body() user: userLoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { message } = await this.authService.login(
      await this.userService.findUser(user.email),
      response,
    );
    return { message };
  }

  //sign up functionality
  @Post('register')
  async register(@Body() user: userRegisterDTO, @Res({ passthrough: true }) response: Response) {

     await this.userService.register(user, response);
     return this.login(user,response);
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

  //why do we need to validate the token @UseGuards(JwtAuthGuard)?
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Token');
    console.log('Logged out successfully');

    return {
      message: 'Logged out successfully',
    };
  }
}
