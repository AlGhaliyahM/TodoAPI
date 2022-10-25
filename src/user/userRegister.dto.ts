import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsString } from 'class-validator';

export class userRegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characterts' })
  password: string;
}
