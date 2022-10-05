import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';

export class userLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
