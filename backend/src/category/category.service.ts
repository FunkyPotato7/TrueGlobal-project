import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async getAll(user: User) {
    return this.categoryRepository.find({
      where: { user },
      relations: ['tasks'],
    });
  }

  async getById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['tasks', 'user'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }

  async createCategory(name: string, user: User) {
    const category = await this.categoryRepository.create({ name });
    category.user = user;
    const newCategory = await this.categoryRepository.save(category);
    return this.getById(newCategory.id);
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(
      { id: updateCategoryDto.id },
      { name: updateCategoryDto.name },
    );
    return this.getById(updateCategoryDto.id);
  }

  async deleteCategory(id: number) {
    const category = await this.getById(id);
    await this.taskService.deleteTaskByCategory(category);
    await this.categoryRepository.delete({ id });
    return category;
  }
}
