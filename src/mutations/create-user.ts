import User from '../models/users';
import * as bcrypt from 'bcryptjs';
import { Mutation, Resolver, Arg } from 'type-graphql';
import { CreateUserInput } from '../schemas/inputs/create-user-input';
import { CreateUserResponse } from '../schemas/responses/create-user-response';

@Resolver()
export class CreateUserResolver {
  @Mutation(() => CreateUserResponse)
  async createUser(
    @Arg("input") input: CreateUserInput
  ): Promise<CreateUserResponse> {
    try {
      const { email } = input;
      // Check if user already exists
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return { status: false, message: "User already exists" };
      }
      input.password = bcrypt.hashSync(input.password, 8);
      const user = new User(input);
      await user.save();

      return { status: true, message: "User created successfully" };
    } catch (err) {
      console.error(err);
      return { status: false, message: "Internal server error" };
    }
  }
}