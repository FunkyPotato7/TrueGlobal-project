import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryService } from '../category/category.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Category } from '../category/category.entity';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  async getAll() {
    return this.taskRepository.find({ relations: ['category'] });
  }

  async getById(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(task: CreateTaskDto) {
    const category = await this.categoryService.getById(task.categoryId);
    const newTask = await this.taskRepository.create(task);
    newTask.category = category;
    return this.taskRepository.save(newTask);
  }

  async updateTask(updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(
      { id: updateTaskDto.id },
      {
        name: updateTaskDto.name,
        description: updateTaskDto.description,
        dateStart: updateTaskDto.dateStart,
        dateEnd: updateTaskDto.dateEnd,
      },
    );
    return await this.getById(updateTaskDto.id);
  }

  async deleteTask(id: number) {
    const task = await this.getById(id);
    await this.taskRepository.delete({ id });
    return task;
  }

  async deleteTaskByCategory(category: Category) {
    await this.taskRepository.delete({ category });
  }
}
