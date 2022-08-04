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
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Todo } from '../entity/Todo.entity';
//Controller will cal the services as req from the client and the servive respond

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('postTask')
  async postTask(@Body() todo: Todo, @Res() res: Response) {
    return this.todoService.postTask(todo, res);
  }

  @Delete(':id')
  deleteTaskByID(@Req() request: Request) {
    return this.todoService.deleteTaskByID(request.params.id);
  }

  @Get(':id')
  getTaskByID(@Req() request: Request, @Res() res: Response) {
    return this.todoService.getTaskByID(request.params.id, res);
  }

  @Get()
  getAllTask(@Res() res: Response) {
    console.log(this.todoService.getAllTask(res));
  }

  @Put(':id')
  updateTask(@Req() request: Request, @Body() todo: Todo) {
    return this.todoService.updateTask(request.params.id, todo);
  }
}
