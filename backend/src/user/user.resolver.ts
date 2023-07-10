import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Query(() => User)
  async getOneUser(@Args('email') email: string) {
    const user = this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
