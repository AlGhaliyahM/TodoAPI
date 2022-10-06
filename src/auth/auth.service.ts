import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { User } from '../user/user.entity';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const User = await this.userService.findUser(email);
    if (User && (await argon2.verify(User.password, pass))) {
      return User;
    }
    //Why returining null?
    return null;
  }

  async login(user: User, response: Response) {
    const payload = { id: user.id, email: user.email, name: user.name };
    const jwt = await this.jwtService.signAsync(payload);

    response.cookie('Token', jwt, { httpOnly: true });

    // return {
    //   message: 'Login Success',
    // };

    return {
      jwt,
      message: 'login sucessfull',
    };
  }

  async verifyAsync(cookie) {
    return this.jwtService.verifyAsync(cookie);
  }
}
