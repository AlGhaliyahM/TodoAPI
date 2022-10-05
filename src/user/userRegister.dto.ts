import { IsEmail, IsNotEmpty } from 'class-validator';
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
  password: string;
}
