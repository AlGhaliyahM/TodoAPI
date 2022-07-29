import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entity/Todo.entity';
//Business Logic

@Injectable({})
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
  ) {}
  postTask() {
    return { result: 'Post task here' };
  }

  getTask() {
    return { result: 'Get task here' };
  }

  getAllTask() {
    return { result: 'Get all tasks here' };
  }
}
