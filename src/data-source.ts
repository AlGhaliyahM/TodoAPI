import 'reflect-metadata';
import { Todo } from './todo/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
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

export const startDb = () => {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
};
