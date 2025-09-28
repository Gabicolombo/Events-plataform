import { Resolver, Query, Ctx } from "type-graphql";
import { EventWithOwnerResponse } from '../schemas/responses/events-with-owner-response';
import Event from '../models/events';

@Resolver()
export class EventResolver {
  @Query(returns => [EventWithOwnerResponse], { nullable: true })
  async getMyEvents(
    @Ctx() context: any
  ) {
    const userId = context.user?.id;
    if (!userId) {
      console.log("User not authenticated");
      return [];
    }

    const events= await Event.find({ owner: userId }).populate('owner');

    return [{ owner: events[0].owner, events: events }];
  }
}