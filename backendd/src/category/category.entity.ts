import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity('categories')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User, { nullable: true })
  user: User;

  @OneToMany(() => Task, (task) => task.category)
  @Field(() => [Task], { nullable: true })
  tasks: Task[];
}
