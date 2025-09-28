import { Resolver, Query } from "type-graphql";
import { EventType } from "../models/events";

@Resolver()
export class EventResolver {
  @Query(() => [EventType], { nullable: true })
  async getEvents() {
    // lógica para retornar eventos
    return [];
  }
}