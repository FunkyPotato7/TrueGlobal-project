import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateTaskDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  dateStart: Date;

  @Field()
  @IsDate()
  dateEnd: Date;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
