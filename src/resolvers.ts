import User from './models/users';
import Event from './models/events';
import { generateToken } from './auth/generateToken';
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
        return true;
      }catch(err){
        console.error(err);
        return false;
      }
    }
  }
}