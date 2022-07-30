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
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request } from 'express';
import { AppDataSource } from '../data-source';
import { Todo } from '../entity/Todo.entity';
//Controller will cal the services as req from the client and the servive respond
//Controller handle req

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('postTask')
  async postTask(@Body() todo: Todo) {
    return this.todoService.postTask(todo);
  }

  @Delete(':id')
  deleteTaskByID(@Req() request: Request) {
    return this.todoService.deleteTaskByID(request.params.id);
  }

  @Get(':id')
  getTaskByID(@Req() request: Request) {
    return this.todoService.getTaskByID(request.params.id);
  }

  @Get('getAllTask')
  getAllTask(@Req() request: Request) {
    //  return this.todoService.getAllTask();
  }

  @Put(':id')
  updateTask(@Req() request: Request, @Body() todo: Todo) {
    return this.todoService.updateTask(request.params.id, todo);
  }
}
