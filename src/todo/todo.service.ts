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
    user.todos.push(newTodo);

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

    if (task.user.email == user.email) {
      this.TodoRepository.remove(task);
      return task;
    } else
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'you do not have access' },
        HttpStatus.FORBIDDEN,
      );
  }

  async updateTask(user, ID, status) {
    //The status is not updating
    //Agreed to update only the status of is_done without the task content >> code need to be changed

    console.log(status);
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
      await this.TodoRepository.update(ID, { is_done: status.is_done });
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

    console.log(taskCount, finishedTasks);

    return {
      'all tasks': taskCount,
      'finished tasks': finishedTasks,
      'pending tasks': taskCount - finishedTasks,
    };
  }

  // async countFinishedTasks(userEmail) {
  // const finishedTasks = await this.TodoRepository.count({
  //   where: { user: { email: userEmail }, is_done: true },
  // });
  //   return finishedTasks;
  // }

  // const pendingTask = await this.usersRepository
  //   .createQueryBuilder('user')
  //   .leftJoinAndSelect('COUNT(user.todos)', 'todo')
  //   .where('user.email = :email', { email: user.email })
  //   .andWhere('todo.is_done = :is_done', { is_done: false })
  //   .getRawMany();

  // console.log(pendingTask);

  // const taskCount2 = await this.TodoRepository.query(
  //   'SELECT COUNT(case when is_done=true then 1 else null end) as done, COUNT(case when is_done=false then 1 else null end) as in_progress FROM Todo WHERE Todo.user.email == ?',
  //   [user.email],
  // );
  // console.log(taskCount2);
}
