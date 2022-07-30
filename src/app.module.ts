import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/Todo.entity';
import { AppDataSource } from './data-source';
@Module({
  imports: [
    TodoModule,

    //ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      entities: [Todo],
      database: 'todo',
      // url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [
        /*...*/
      ],
      migrationsTableName: 'custom_migration_table',
    }),
  ],
})
export class AppModule {}

// The forRoot()
// method supports all the configuration properties
// exposed by the DataSource constructor from the TypeORM package.
