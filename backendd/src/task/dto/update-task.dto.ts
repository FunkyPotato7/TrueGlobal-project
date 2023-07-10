import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTaskDto {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  dateStart: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  dateEnd: Date;
}
