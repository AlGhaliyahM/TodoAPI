import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IsString } from 'class-validator';
import { Todo } from '../todo/todo.entity';

export class userDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
