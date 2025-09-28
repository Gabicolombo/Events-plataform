import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Number, { nullable: true })
  capacity?: number;

  @Field(() => [String])
  participants!: string[];

  @Field(() => String)
  date!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  status!: string;
}