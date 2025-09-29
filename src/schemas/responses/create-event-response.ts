import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CreateEventResponse {
  @Field()
  status!: boolean;

  @Field({ nullable: true })
  message?: string;
}