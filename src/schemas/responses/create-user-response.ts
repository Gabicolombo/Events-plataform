import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CreateUserResponse {
  @Field()
  status!: boolean;

  @Field({ nullable: true })
  message?: string;
}