import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './todo/todo.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startDb } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  startDb();
}

bootstrap();
