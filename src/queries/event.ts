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

    const events = await Event.find({ owner: userId }).populate('owner');
    if (!events || events.length === 0) {
      console.log("No events found");
      return [];
    }
    return [{ owner: events[0].owner, events: events }];
  }

  @Query(returns => [EventWithOwnerResponse], { nullable: true })
  async getAllEvents(
    @Ctx() context: any
  ) {
    const events = await Event.find().populate('owner');
    if (!events || events.length === 0) {
      console.log("No events found");
      return [];
    }
    return events.map(event => ({ owner: event.owner, events: [event] }));
  }


  @Query(returns => [EventWithOwnerResponse], { nullable: true })
  async getEventsByParticipant(
    @Ctx() context: any
  ) {
    const userId = context.user?.id;
    if (!userId) {
      console.log("User not authenticated");
      return [];
    }
    const events = await Event.find({ participants: {$in: [userId]} }).populate('owner');
    if (!events || events.length === 0) {
      console.log("No events found");
      return [];
    }
    return events.map(event => ({ owner: event.owner, events: [event] }));
  }

  @Query(returns => [EventWithOwnerResponse], { nullable: true })
  async getNewEvents(
    @Ctx() context: any
  ) {
    const userId = context.user?.id;
    if (!userId) {
      console.log("User not authenticated");
      return [];
    }
    const events = await Event.find({ owner: { $ne: userId}, participants: {$ne: userId} }).populate('owner');
    if (!events || events.length === 0) {
      console.log("No events found");
      return [];
    }
    return events.map(event => ({ owner: event.owner, events: [event] }));
  }
}