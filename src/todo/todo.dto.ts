import { User } from '../user/user.entity';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTodoDto {
  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  task: string;
}
