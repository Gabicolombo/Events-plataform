import mongoose from 'mongoose';
import { ObjectType, Field } from "type-graphql";
import { UserType } from './users';

@ObjectType()
export class EventType {
  @Field()
  title!: string;

  @Field()
  owner!: UserType;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  capacity?: number;

  @Field(() => [String])
  participants!: string[];

  @Field()
  date!: string;

  @Field()
  location!: string;

  @Field()
  status!: string;
}

const EventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  description: { type: String},
  capacity: { type: Number},
  participants: [{ type: mongoose.Schema.Types.String, ref: 'User'}],
  date: { type: String, required: true},
  location: { type: String, required: true},
  status: { type: String, required: true, enum: ['active', 'inactive']},
})

export default mongoose.model('Event', EventSchema);