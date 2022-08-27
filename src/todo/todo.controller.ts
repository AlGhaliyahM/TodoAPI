import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTask(
    @Headers('email') email: string,
    @Body() todo: Todo,
  ): Promise<Todo> {
    const task = await this.todoService.postTask(email, todo);
    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTaskByID(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTaskByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTaskByID(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getTaskByID(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTask(@Headers('email') email: string): Promise<Todo[]> {
    const allTask = this.todoService.getAllTask(email);
    return allTask;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.updateTask(id, todo.is_done);
  }
}
