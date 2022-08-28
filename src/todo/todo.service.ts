import {
  Injectable,
  Post,
  Get,
  Req,
  Res,
  Body,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';
//Business Logic

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async postTask(userEmail, todo: Todo) {
    const newTask = await this.TodoRepository.save(todo);

    let user = await this.usersRepository.findOne({
      where: { email: userEmail },
      relations: ['todos'],
    });
    console.log(user);
    user.todos.push(todo);

    await this.usersRepository.save(user);

    return newTask;
  }

  async getTaskByID(userEmail, ID) {
    // const task = await this.TodoRepository.findOneBy({
    //   id: ID,
    // });
    // return task;

    let task = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });

    if (task.user.email == userEmail) {
      return task;
    }
  }

  async getAllTask(userEmail) {
    let user = await this.usersRepository.findOne({
      where: { email: userEmail },
      relations: ['todos'],
    });

    //return await this.TodoRepository.find();
    return await user.todos;
  }

  async deleteTaskByID(userEmail, ID) {
    // const taskToDelete = await this.TodoRepository.findOneBy({ id: ID });
    // await this.TodoRepository.remove(taskToDelete);
    // return taskToDelete;

    let deletedTask = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });

    //console.log(deletedTask);
    //console.log(deletedTask.user.email == userEmail);

    if (deletedTask.user.email == userEmail) {
      this.TodoRepository.remove(deletedTask);
      return deletedTask;
    }
  }

  async updateTask(userEmail, ID, status, task) {
    // await this.TodoRepository.update(ID, { is_done: status });
    // const updatedTask = await this.TodoRepository.findOneBy({ id: ID });
    // return updatedTask;

    let updatedTask = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });

    if (updatedTask.user.email == userEmail) {
      await this.TodoRepository.update(ID, { is_done: status, task: task });
      return updatedTask;
    }
  }
}
