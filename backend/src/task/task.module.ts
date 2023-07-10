import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User, Category]),
    forwardRef(() => CategoryModule),
    UserModule,
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
