import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TaskService } from './task.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async getAllTask() {
    return this.taskService.getAll();
  }

  @Mutation(() => Task)
  async createTask(@Args('createTaskDto') createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Mutation(() => Task)
  async updateTask(@Args('updateTaskDto') updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(updateTaskDto);
  }

  @Mutation(() => Task)
  async deleteTask(@Args('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
