import { Mutation, Resolver, Arg, Ctx } from 'type-graphql';

import Event from '../models/events';
import User from '../models/users';
import { CreateEventInput } from '../schemas/inputs/create-event-input';
import { sendNotificationToQueue } from '../producers/notifyProducer';

@Resolver()
export class CreateEventResolver {
  @Mutation(() => Boolean)
  async createEvent(
    @Arg("input") input: CreateEventInput,
    @Ctx() context: any
  ): Promise<boolean> {
    try {
      const userId = context.user?.id;
      if (!userId) {
        console.log("User not authenticated");
        return false;
      }
      const eventData = {
        ...input,
        owner: userId
      };
      const newEvent = new Event(eventData);
      await newEvent.save();
      console.log("Event created successfully");
      // Notify the user about the event creation
      // Let's get the email of the participants
      const participants = await User.find({ _id: { $in: input.participants } });
      const emails = participants.map((user: any) => user.email);
      for (const email of emails) {
        const eventData = {
          email: email,
          subject: `New Event Created: ${input.title}`,
          text: `A new event titled "${input.title}" has been created. Check it out!`
        };
        // Sending notification to the queue
        await sendNotificationToQueue(eventData);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}