import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryDto {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsString()
  name: string;
}
