import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as process from 'process';

import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Category, Task],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
