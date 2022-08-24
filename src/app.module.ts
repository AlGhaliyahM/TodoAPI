import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { AppDataSource } from './data-source';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TodoModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      entities: [Todo, User],
      database: 'todo',
      autoLoadEntities: true,
      synchronize: false,
      // migrationsTableName: 'custom_migration_table',
    }),
  ],
})
export class AppModule {}
