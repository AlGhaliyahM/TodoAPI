import { Injectable, Post, Get, Req, Res, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
//import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signIn(user: User) {
    //check if email exists
    const potUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (potUser == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'email not found' },
        HttpStatus.BAD_REQUEST,
      );

    //check if hashed pass is correct using verify
    if (!(await argon2.verify(potUser.password, user.password)))
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'password not correct' },
        HttpStatus.BAD_REQUEST,
      );

    //generate a JWT
    // here we will request the auth controller to generate a JWT
    return user;
  }

  async signUp(user: User) {
    console.log(user); // for checking that the sign in works
    const hash = await argon2.hash(user.password);

    return await this.usersRepository.save({
      name: user.name,
      password: hash,
      email: user.email,
    });
  }
}
