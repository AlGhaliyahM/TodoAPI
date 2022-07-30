import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './entity/Todo.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  port: 5432,
  entities: [Todo],
  database: 'todo',
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    // const todo = new Todo();
    // todo.task = 'test task ';
    // AppDataSource.manager.save(todo);
    // console.log('todo has been saved. todo id is', todo.id);
  })
  .catch((error) => console.log(error));
