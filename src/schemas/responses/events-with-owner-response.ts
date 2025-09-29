import { ObjectType, Field } from "type-graphql";
import { UserType } from '../../models/users';
import { EventType } from '../../models/events';

@ObjectType()
export class EventWithOwnerResponse {
  @Field(() => UserType)
  owner!: UserType;

  @Field(() => [EventType])
  events!: EventType[];
}