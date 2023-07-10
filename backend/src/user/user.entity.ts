import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { UserRole } from './user-role.enum';
import { Category } from '../category/category.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    // transformer: new UserTransformer(),
  })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Field()
  role: UserRole;

  @OneToMany(() => Category, (category) => category.user)
  @Field(() => [Category], { nullable: true })
  categories: Category[];
}
