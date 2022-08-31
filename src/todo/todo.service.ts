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

  async postTask(User, todo: Todo) {
    const newTask = await this.TodoRepository.save(todo);

    const user = await this.usersRepository.findOne({
      where: { email: User.email },
      relations: ['todos'],
    });
    console.log(user);
    user.todos.push(todo);

    await this.usersRepository.save(user);

    return newTask;
  }

  async getTaskByID(user, ID) {
    const task = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });
    if (task == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    if (task.user.email == user.email) {
      return task;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async getAllTask(user) {
    const User = await this.usersRepository.findOne({
      where: { email: user.email },
      relations: ['todos'],
    });
    return await User.todos;
  }

  async deleteTaskByID(user, ID) {
    const task = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });
    if (task == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    console.log(task);

    if (task.user.email == user.email) {
      this.TodoRepository.remove(task);
      return task;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async updateTask(user, ID, status, task) {
    const updatedTask = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });
    if (updatedTask == null)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'bad request' },
        HttpStatus.BAD_REQUEST,
      );
    if (updatedTask.user.email == user.email) {
      await this.TodoRepository.update(ID, { is_done: status, task: task });
      return await this.TodoRepository.findOne({
        where: { id: ID },
        relations: ['user'],
      });
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async countTasks(user) {
    // const taskCount = await this.TodoRepository.count({
    //   where: { user: { email: userEmail } },
    // });
    const taskCount2 = await this.TodoRepository.query(
      'SELECT COUNT(case when is_done=true then 1 else null end) as done, COUNT(case when is_done=false then 1 else null end) as in_progress FROM Todo WHERE ',
    );
    console.log(taskCount2);
    return taskCount2;
  }

  // async countFinishedTasks(userEmail) {
  //   const finishedTasks = await this.TodoRepository.count({
  //     where: { user: { email: userEmail }, is_done: true },
  //   });
  //   return finishedTasks;
  // }
}
