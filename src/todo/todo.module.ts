import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { startDb } from '../data-source';
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  exports: [TypeOrmModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
