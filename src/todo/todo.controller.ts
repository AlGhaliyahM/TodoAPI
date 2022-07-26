import { Controller, Post, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
//Controller will cal the services as req from the client and the servive respond
//Controller handle req
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('postTask')
  postTask() {
    return this.todoService.postTask();
  }

  @Get('getTask')
  getTask() {
    return this.todoService.getTask();
  }

  @Get('getAllTask')
  getAllTask() {
    return this.todoService.getAllTask();
  }
}
