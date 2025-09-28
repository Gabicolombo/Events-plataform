import User from '../models/users';
import { Resolver, Mutation, Arg } from "type-graphql";
import { generateToken } from '../auth/generateToken';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from '../schemas/inputs/login-input';
import {LoginResponse} from '../schemas/responses/login-response';

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("input") input: LoginInput
  ): Promise<LoginResponse> {
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
  }
}