import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string) {
    const User = await this.userService.findUser(email);
    if (User && (await argon2.verify((await User).password, pass))) {
      return User;
    }
    return null;
  }
}
