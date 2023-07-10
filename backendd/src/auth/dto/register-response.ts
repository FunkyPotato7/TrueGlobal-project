import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponse {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  role: string;
}
