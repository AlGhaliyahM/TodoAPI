import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import { runInThisContext } from 'vm';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(user: User) {
    const hash = await argon2.hash(user.password);

    const userEmail = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (userEmail != null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'email already in use' },
        HttpStatus.BAD_REQUEST,
      );

    const userRegistry = await this.usersRepository.save({
      name: user.name,
      password: hash,
      email: user.email,
    });

    // for checking that the sign in works
    //console.log(userRegistry);
  }

  async findUser(Email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: Email });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async deleteAccount(Email) {
    const userAccount = await this.usersRepository.findOne({
      where: { email: Email }     
    });
    this.usersRepository.remove(userAccount);
    return {Message:"Your Account is deleted"}
  }
}
