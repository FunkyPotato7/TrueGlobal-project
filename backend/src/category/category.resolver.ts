import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { User } from '../user/user.entity';
import { CurrentUser } from '../decorator/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async getAllCategories(@CurrentUser() user: User) {
    return this.categoryService.getAll(user);
  }

  @Query(() => Category)
  async getCategory(@Args('id') id: number) {
    return this.categoryService.getById(id);
  }

  @Mutation(() => Category)
  async createCategory(@Args('name') name: string, @CurrentUser() user: User) {
    return this.categoryService.createCategory(name, user);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
