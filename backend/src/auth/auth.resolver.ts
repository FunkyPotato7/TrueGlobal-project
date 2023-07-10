import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException, ConflictException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterResponse } from './dto/register-response';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => RegisterResponse)
  async register(@Args('registerUserDto') registerUserDto: LoginUserDto) {
    registerUserDto.email = registerUserDto.email.toLowerCase().trim();
    const user = await this.userService.findOne(registerUserDto.email);
    if (user) {
      throw new ConflictException('User with this Email already exist');
    }
    return this.userService.createUser(registerUserDto);
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    loginUserDto.email = loginUserDto.email.toLowerCase().trim();
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new BadRequestException('Wrong Email or Password');
    }
    return this.authService.login(loginUserDto);
  }
}
