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
    //console.log(todo);
  }

  async getTaskByID(ID, res) {
    const task = await this.TodoRepository.findOneBy({
      id: ID,
    });
    res.json(task);
    // console.log(task);
  }

  async getAllTask(res) {
    const AllTask = await this.TodoRepository.find();
    res.json(AllTask);
    //console.log(AllTask);
  }

  // DONE returns the deleted task
  async deleteTaskByID(ID,Res) {
    const taskToDelete = await this.TodoRepository.findOneBy({id: ID,});
    Res.json(taskToDelete);
    await this.TodoRepository.remove(taskToDelete);
  }

  // DONE status and updatedAt are updated
  async updateTask(ID, status,Res) {
    await this.TodoRepository.update(ID,{is_done:status});
    const updatedTask = await this.TodoRepository.findOneBy({id: ID,});
    Res.json(updatedTask)
    
  }
}