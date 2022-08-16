import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Delete,
  Res,
  Put,
  HttpCode,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Todo } from './todo.entity';
//Controller will cal the services as req from the client and the servive respond

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Post()
  async postTask(@Body() todo: Todo): Promise<Todo> {
    const test = await this.todoService.postTask(todo);
    return test;
  }

  @Delete(':id')
  deleteTaskByID(@Param() params): Promise<Todo> {
    return this.todoService.deleteTaskByID(params.id);
  }

  @Get(':id')
  getTaskByID(@Param() params): Promise<Todo> {
    return this.todoService.getTaskByID(params.id);
  }

  @Get()
  getAllTask(): Promise<Todo[]> {
    const allTask = this.todoService.getAllTask();
    return allTask;
  }

  @Put(':id')
  updateTask(@Param() params, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.updateTask(params.id, todo.is_done);
  }
}
