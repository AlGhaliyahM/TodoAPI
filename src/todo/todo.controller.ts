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
  deleteTaskByID(
    @Headers('email') email: string,
    @Param('id') id: string,
  ): Promise<Todo> {
    return this.todoService.deleteTaskByID(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('countTask')
  async countTasks(@Headers('email') email: string) {
    return await this.todoService.countTasks(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('countFinished')
  async countFinishedTasks(@Headers('email') email: string) {
    return this.todoService.countFinishedTasks(email);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTaskByID(
    @Headers('email') email: string,
    @Param('id') id: string,
  ): Promise<Todo> {
    return this.todoService.getTaskByID(email, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTask(@Headers('email') email: string): Promise<Todo[]> {
    const allTask = this.todoService.getAllTask(email);
    return allTask;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTask(
    @Headers('email') email: string,
    @Param('id') id: string,
    @Body() todo: Todo,
  ): Promise<Todo> {
    return this.todoService.updateTask(email, id, todo.is_done, todo.task);
  }
}
