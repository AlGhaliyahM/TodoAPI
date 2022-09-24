import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import 'dotenv/config';
import { Request } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jw') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }

  // private static extractJWT(req: Request): string | null {
  //   if (req.cookies && 'Token' in req.cookies) {
  //     //i've reached here but i still don't know how to sent the cookie to the
  //     return req.cookies.token;
  //   }
  //   return null;
  // }
}
