//Entity is a class that maps to a database table
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;
  // changed to @UpdateDateColumn to update automatically
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  task: string;

  @Column({ default: false })
  is_done: boolean;
}
