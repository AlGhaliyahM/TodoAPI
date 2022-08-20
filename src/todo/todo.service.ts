import { Injectable, Post, Get, Req, Res, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
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
    return await this.TodoRepository.save(todo);
    //console.log(todo);
  }

  async getTaskByID(ID) {
    const task = await this.TodoRepository.findOneBy({
      id: ID,
    });
    return task;
    //res.json(task);
    // console.log(task);
  }

  async getAllTask() {
    return await this.TodoRepository.find();
  }

  async deleteTaskByID(ID) {
    const taskToDelete = await this.TodoRepository.findOneBy({ id: ID });
    //Res.json(taskToDelete);
    await this.TodoRepository.remove(taskToDelete);
    return taskToDelete;
  }

  async updateTask(ID, status) {
    await this.TodoRepository.update(ID, { is_done: status });
    const updatedTask = await this.TodoRepository.findOneBy({ id: ID });
    //Res.json(updatedTask);
    return updatedTask;
  }
}
