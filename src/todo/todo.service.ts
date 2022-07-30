import { Injectable, Post, Get, Req, Res, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entity/Todo.entity';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
//Business Logic

@Injectable({})
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
  ) {}

  async postTask(todo: Todo) {
    const task = await this.TodoRepository.save(todo);
    // return task;
  }

  async getTaskByID(ID) {
    const task = await this.TodoRepository.findOneBy({
      id: ID,
    });
    console.log(task);
  }

  async getAllTask() {
    return this.TodoRepository.find({});
  }

  async deleteTaskByID(ID) {
    const taskToDelete = await this.TodoRepository.findOneBy({
      id: ID,
    });
    console.log(taskToDelete);
    await this.TodoRepository.remove(taskToDelete);
  }

  async updateTask(ID, todo: Todo) {
    const task = await this.TodoRepository.findOneBy({
      id: ID,
    });
    console.log('before update');
    console.log(task);
    const updateTask = await this.TodoRepository.save(todo);
    console.log('After update');
    console.log(updateTask);
  }
}
