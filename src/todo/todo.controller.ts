import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/user.decorator';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTask(
    @GetUser() user: any,
    @Body(ValidationPipe) todo: CreateTodoDto,
  ): Promise<CreateTodoDto> {
    return await this.todoService.postTask(user, todo);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTaskByID(@GetUser() user: any, @Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTaskByID(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('countTask')
  async countTasks(@GetUser() user: any) {
    return await this.todoService.countTasks(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('countFinished')
  // async countFinishedTasks(@Headers('email') email: string) {
  //   return this.todoService.countFinishedTasks(email);
  // }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTaskByID(@GetUser() user: User, @Param('id') id: string): Promise<Todo> {
    return this.todoService.getTaskByID(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTask(@GetUser() user: any): Promise<Todo[]> {
    const allTask = this.todoService.getAllTask(user);
    return allTask;
  }

  //Agreed to update only the status of is_done without the task content >> code need to be changed
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTask(@GetUser() user: any, @Param('id') id: string) {
    return this.todoService.updateTask(user, id);
  }
}
