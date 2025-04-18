import User from './models/users.js';

export const resolvers = {
  Mutation: {
    createUser: async(_:unknown, { input }) => {
      try{
        const { email } = input;
        // Check if user already exists
        const userExist = await User.findOne({ email: email});
        if(userExist){
          console.log("User already exists");
          return false;
        }
        const user = new User(input);
        await user.save();

        return true;
      }catch(err){
        console.error(err);
        return false;
      }
    }
  }
}