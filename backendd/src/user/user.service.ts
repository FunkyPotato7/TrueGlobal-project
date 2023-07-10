import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll() {
    return this.userRepository.find({
      relations: ['categories', 'categories.tasks'],
    });
  }

  async findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(registerUserDto: LoginUserDto) {
    const salt = await bcrypt.genSalt();
    registerUserDto.password = await bcrypt.hash(
      registerUserDto.password,
      salt,
    );
    const newUser = await this.userRepository.create(registerUserDto);
    return this.userRepository.save(newUser);
  }

}
