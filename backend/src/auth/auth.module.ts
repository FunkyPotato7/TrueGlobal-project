import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.PRIVATE_ACCESS_KEY,
      signOptions: { expiresIn: '3h' },
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
