import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Res,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/user.decorator';
import { Response, Request } from 'express';
import { userRegisterDTO } from './userRegister.dto';
import { userLoginDTO } from './userLogin.dto';
import { User } from './user.entity';

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
  async register(
    @Body() user: userRegisterDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.userService.register(user, response);
    return this.login(user, response);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async user(@GetUser() user: User, @Req() request: Request) {
    try {
      await this.authService.verifyAsync(request.cookies['Token']);
      const username = (await this.userService.findUser(user.email)).name;
      return {
        authenticated: true,
        name: username,
      };
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  
  // @UseGuards(JwtAuthGuard)
  // @Delete()
  // async deleteAccount(@GetUser() user: any) {
  //   return this.userService.deleteAccount(user);
  // }

  
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {   
    return this.userService.logout(response);
  }
}
