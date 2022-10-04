import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { IsString } from 'class-validator';

export class userDTO {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
