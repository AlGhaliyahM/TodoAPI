import { Injectable, Post, Get, Req, Res, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Request, Response } from 'express';
//import jwt from 'jsonwebtoken';
require('dotenv').config();
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(user: User) {
    const argon2 = require('argon2');
    const hash = await argon2.hash(user.password);

    this.usersRepository.save({
      name: user.name,
      password: hash,
      email: user.email,
    });

    const accessToken = this.generateAccessToken({ name: user.name });

    return { accessToken: accessToken };
  }

  generateAccessToken(user) {
    var jwt = require('jsonwebtoken');

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s',
    });
  }
}
