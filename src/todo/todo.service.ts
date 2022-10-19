import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';
import { CreateTodoDto } from './todo.dto';
//Business Logic

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  TODO: ' Add input validation ';
  async postTask(User, todo: CreateTodoDto) {
    const newTodo: Todo = new Todo();
    newTodo.task = todo.task;

    await this.TodoRepository.save(newTodo);
    const user = await this.usersRepository.findOne({
      where: { email: User.email },
      relations: ['todos'],
    });
    user.todos.unshift(newTodo);
    // user.todos.push(newTodo);

    await this.usersRepository.save(user);

    return newTodo;
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
      //removed the user attribute
      delete task.user;
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
    User.todos.sort((a: Todo, b: Todo) => {
      if (a.is_done && b.is_done)
        return b.updatedAt.valueOf() - a.updatedAt.valueOf();
    });
    User.todos.sort((a: Todo, b: Todo) => {
      if (!a.is_done && !b.is_done)
        return b.created_at.valueOf() - a.created_at.valueOf();
    });

    return User.todos;
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

    if (task.user.email == user.email) {
      this.TodoRepository.remove(task);
      return task;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async updateTask(user, ID) {
    //The status is not updating
    //Agreed to update only the status of is_done without the task content >> code need to be changed
    const updatedTask = await this.TodoRepository.findOne({
      where: { id: ID },
      relations: ['user'],
    });

    if (updatedTask == null)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'bad request' },
        HttpStatus.NOT_FOUND,
      );
    if (updatedTask.user.email == user.email) {
      await this.TodoRepository.update(ID, {
        is_done: !updatedTask.is_done,
      });
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
    const taskCount = await this.TodoRepository.count({
      where: { user: { email: user.email } },
    });
    const finishedTasks = await this.TodoRepository.count({
      where: { user: { email: user.email }, is_done: true },
    });

    return {
      allTasks: taskCount,
      completedTasks: finishedTasks,
      pendingTasks: taskCount - finishedTasks,
    };
  }
}
