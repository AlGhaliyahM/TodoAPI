import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
//import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // async signIn(user: User) {
  //   //check if email exists
  //   const potUser = await this.usersRepository.findOneBy({
  //     email: user.email,
  //   });
  //   if (potUser == null)
  //     throw new HttpException(
  //       { status: HttpStatus.BAD_REQUEST, error: 'email not found' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   console.log('email');
  //   //check if hashed pass is correct using verify
  //   if (!(await argon2.verify(potUser.password, user.password)))
  //     throw new HttpException(
  //       { status: HttpStatus.BAD_REQUEST, error: 'password not correct' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   console.log('pass');
  //   console.log(potUser.id);
  //   //const accessToken = this.generateAccessToken({ id: potUser.id });
  //   //return { accessToken: accessToken };
  // }

  async signUp(user: User) {
    const hash = await argon2.hash(user.password);

    const posUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (posUser != null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'email already in use' },
        HttpStatus.BAD_REQUEST,
      );
    const userTest = await this.usersRepository.save({
      name: user.name,
      password: hash,
      email: user.email,
    });
    console.log(userTest); // for checking that the sign in works
  }

  async findUser(Email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: Email });
  }
  // async generateAccessToken(posUser: User) {
  //   const user = await this.findUser(posUser.email);
  //   const payload = { id: user.id, email: user.email, name: user.name };
  //   var jwt = require('jsonwebtoken');
  //   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
  //     expiresIn: '30m',
  //   });
  // }
}
