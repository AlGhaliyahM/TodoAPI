import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const User = await this.userService.findUser(email);
    if (User && (await argon2.verify((await User).password, pass))) {
      return User;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
