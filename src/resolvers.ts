import User from './models/users';
import Event from './models/events';
import { generateToken } from './auth/generateToken';
import { sendNotificationToQueue } from './producers/notifyProducer';
import * as bcrypt from 'bcryptjs';

export const resolvers = {
  Mutation: {
    createUser: async (_: unknown, { input }: any ) => {
      try {
        const { email } = input;
        // Check if user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
          console.log("User already exists");
          return false;
        }
        input.password = bcrypt.hashSync(input.password, 8);
        const user = new User(input);
        await user.save();

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    login: async (_: unknown, { input }: any) => {
      const { email, password } = input;

      const user = await User.findOne({ email: email });
      if (!user) {
        console.log("User not found");
        return { token: "", logged: false };
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      
      if (!passwordIsValid) {
        console.log("Invalid password");
        return { token: "", logged: false };;
      }
      const token = generateToken(user);
      console.log("User logged in successfully");
      return {
        token,
        logged: true,
      }
    },

    createEvent: async(_:unknown,{ input }: any, context: any) => {
      try{
        const userId = context.user?.id;
        if(!userId) {
          console.log("User not authenticated");
          return false;
        }
        input.owner = userId;
        const newEvent = new Event(input);
        await newEvent.save();
        console.log("Event created successfully");
        // Notify the user about the event creation
        // Let's get the email of the participants
        const participants = await User.find({ _id: { $in: input.participants } });
        const emails = participants.map((user: any) => user.email);
        for(const email of emails) {
          const eventData = { 
            email: email,
            subject: `New Event Created: ${input.title}`,
            text: `A new event titled "${input.title}" has been created. Check it out!`
          };
          // Sending notification to the queue
          await sendNotificationToQueue(eventData);
        }
        return true;
      }catch(err){
        console.error(err);
        return false;
      }
    }
  }
}