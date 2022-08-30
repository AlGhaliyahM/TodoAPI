import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
      relations: ['todos'],
    });
    console.log(user);
    user.todos.push(todo);

    await this.usersRepository.save(user);

    return newTask;
  }

  async getTaskByID(userEmail, ID) {
    const task = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });
    if (task == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    if (task.user.email == userEmail) {
      return task;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async getAllTask(userEmail) {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
      relations: ['todos'],
    });
    return await user.todos;
  }

  async deleteTaskByID(userEmail, ID) {
    const deletedTask = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });
    if (deletedTask == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    if (deletedTask.user.email == userEmail) {
      this.TodoRepository.remove(deletedTask);
      return deletedTask;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async updateTask(userEmail, ID, status, task) {
    const updatedTask = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });
    if (updatedTask == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    if (updatedTask.user.email == userEmail) {
      await this.TodoRepository.update(ID, { is_done: status, task: task });
      return updatedTask;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async countTasks(userEmail) {
    const taskCount = await this.TodoRepository.count({
      where: { user: { email: userEmail } },
    });
    return taskCount;
    //let { sum } = await this.TodoRepository.createQueryBuilder().select("SUM(*)").from()
    //const taskCount = await this.TodoRepository.query('SELECT SUM(*) FROM Todo WHERE email=')
  }
  async countFinishedTasks(userEmail) {
    const finishedTasks = await this.TodoRepository.count({
      where: { user: { email: userEmail }, is_done: true },
    });
    return finishedTasks;
    //let { sum } = await this.TodoRepository.createQueryBuilder().select("SUM(*)").from()
    //const taskCount = await this.TodoRepository.query('SELECT SUM(*) FROM Todo WHERE email=')
  }
}
