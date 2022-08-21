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

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  async postTask(@Body() todo: Todo): Promise<Todo> {
    if (this.authenticateToken) {
      const test = await this.todoService.postTask(todo);
      return test;
    }
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

  authenticateToken(req, res, next) {
    var jwt = require('jsonwebtoken');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return false;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return false;
      req.user = user;

      return true;
      //next();
    });
  }
}
