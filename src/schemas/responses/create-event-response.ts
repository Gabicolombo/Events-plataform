import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CreateEventResponse {
  @Field()
  status!: boolean;

  @Field()
  message?: string;
}