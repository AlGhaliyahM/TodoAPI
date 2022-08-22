import { Injectable, Post, Get, Req, Res, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signIn(user: User) {
    const argon2 = require('argon2');
    //check if email exists
    const potUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (potUser == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'email not found' },
        HttpStatus.BAD_REQUEST,
      );
    console.log('email');
    //check if hashed pass is correct using verify
    if (!(await argon2.verify(potUser.password, user.password)))
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'password not correct' },
        HttpStatus.BAD_REQUEST,
      );
    console.log('pass');
    console.log(potUser.id);
    //const accessToken = this.generateAccessToken({ id: potUser.id });
    //return { accessToken: accessToken };
  }

  async signUp(user: User) {
    const argon2 = require('argon2');
    const hash = await argon2.hash(user.password);

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
  async generateAccessToken(posUser: User) {
    const user = await this.findUser(posUser.email);
    const payload = { id: user.id, email: user.email, name: user.name };
    var jwt = require('jsonwebtoken');
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
  }
}
