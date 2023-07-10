import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { UserModule } from '../user/user.module';
import { Category } from './category.entity';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, Task]),
    forwardRef(() => TaskModule),
    UserModule,
  ],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
