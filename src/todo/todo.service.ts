import { Injectable, Post, Get, Req, Res, Body, Delete } from '@nestjs/common';
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

  //Linked with the user
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

  async getTaskByID(ID) {
    const task = await this.TodoRepository.findOneBy({
      id: ID,
    });
    return task;
  }

  //Linked with the user
  async getAllTask(userEmail) {
    let user = await this.usersRepository.findOne({
      where: { email: userEmail },
      relations: ['todos'],
    });

    //return await this.TodoRepository.find();
    return await user.todos;
  }

  async deleteTaskByID(ID) {
    const taskToDelete = await this.TodoRepository.findOneBy({ id: ID });

    await this.TodoRepository.remove(taskToDelete);
    return taskToDelete;
  }

  async updateTask(ID, status) {
    await this.TodoRepository.update(ID, { is_done: status });
    const updatedTask = await this.TodoRepository.findOneBy({ id: ID });

    return updatedTask;
  }
}
