//Entity is a class that maps to a database table
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  task: string;

  @Column({ default: false })
  is_done: boolean;
}
