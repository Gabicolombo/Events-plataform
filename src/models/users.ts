import mongoose from 'mongoose';

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserType {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  nationality!: string;
}

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  nationality: {type: String, required: true}
})

export default mongoose.model('User', UserSchema);