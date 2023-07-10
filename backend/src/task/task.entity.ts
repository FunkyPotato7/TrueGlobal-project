import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Category } from '../category/category.entity';

@Entity('tasks')
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: false })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  dateStart: Date;

  @Column({ type: 'timestamp', nullable: false })
  @Field()
  dateEnd: Date;

  @ManyToOne(() => Category, (category) => category.tasks)
  @Field(() => Category, { nullable: true })
  category: Category;
}
