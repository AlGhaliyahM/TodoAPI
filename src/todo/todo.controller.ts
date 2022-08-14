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
import { Todo } from './todo.entity';
//Controller will cal the services as req from the client and the servive respond

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async postTask(@Body() todo: Todo, @Res() res: Response) {
    return this.todoService.postTask(todo, res);
  }

  @Delete(':id')
  deleteTaskByID(@Req() request: Request, @Res() res: Response) {
    return this.todoService.deleteTaskByID(request.params.id, res);
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
  updateTask(
    @Req() request: Request,
    @Body() todo: Todo,
    @Res() res: Response,
  ) {
    return this.todoService.updateTask(request.params.id, todo.is_done, res);
  }
}
