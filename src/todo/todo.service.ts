import { Injectable } from '@nestjs/common';
//Business Logic

@Injectable({})
export class TodoService {
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
