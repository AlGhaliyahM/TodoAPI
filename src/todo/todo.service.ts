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

  async postTask(todo: Todo, res) {
    const task = await this.TodoRepository.save(todo);
    res.json(todo);
    console.log(todo);
  }

  async getTaskByID(ID, res) {
    const task = await this.TodoRepository.findOneBy({
      id: ID,
    });
    res.json(task);
    console.log(task);
  }

  //There is a Problem
  async getAllTask(res) {
    return this.TodoRepository.find({});
  }

  // DONE  But response is missing
  async deleteTaskByID(ID) {
    const taskToDelete = await this.TodoRepository.findOneBy({
      id: ID,
    });
    console.log(taskToDelete);
    await this.TodoRepository.remove(taskToDelete);
  }

  //Date need to be uodated + (isdone)
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
