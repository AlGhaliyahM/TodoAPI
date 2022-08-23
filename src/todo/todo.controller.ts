import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTask(@Body() todo: Todo): Promise<Todo> {
    const test = await this.todoService.postTask(todo);
    return test;
  }

  @Delete(':id')
  deleteTaskByID(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTaskByID(id);
  }

  @Get(':id')
  getTaskByID(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getTaskByID(id);
  }

  @Get()
  getAllTask(): Promise<Todo[]> {
    const allTask = this.todoService.getAllTask();
    return allTask;
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.updateTask(id, todo.is_done);
  }
}
