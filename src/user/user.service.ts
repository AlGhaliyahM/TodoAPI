import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
//import { JwtService } from '@nestjs/jwt';
import { userRegisterDTO } from './userRegister.dto';
import { Response } from 'express-serve-static-core';
//import { Response, Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(user: userRegisterDTO, response: Response) {
    const hash = await argon2.hash(user.password);

    const userEmail = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (userEmail != null)
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'email already in use' },
        HttpStatus.CONFLICT,
      );

    await this.usersRepository.save({
      name: user.name,
      password: hash,
      email: user.email,
    });

    return {
      message: 'registration successful',
    };
  }

  async findUser(userEmail: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ email: userEmail });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async deleteAccount(userEmail) {
    const userAccount = await this.usersRepository.findOne({
      where: { email: userEmail },
    });
    this.usersRepository.remove(userAccount);
    return { Message: 'Your Account is deleted' };
  }

  async findAll() {
    return this.usersRepository.find();
  }
  //async logout(response: Response) {}
}
