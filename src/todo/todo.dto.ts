import { User } from '../user/user.entity';
import {  IsNotEmpty, IsString,  } from 'class-validator';


TODO:"Check if user attribute is from the user dto or enitity "

export class CreateTodoDto {
    // @IsNotEmpty()
    id: number;

    // @IsNotEmpty()
    created_at: Date;

    // @IsNotEmpty()
    updatedAt: Date;

    // Validates for a non-empty string
    @IsString()
    @IsNotEmpty()
    task: string;

    // @IsNotEmpty()
    is_done: boolean;

    // @IsNotEmpty()
    user: User;
  }