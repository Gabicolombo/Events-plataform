import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    nationality: String!
  }

  type Event {
    id: ID!
    title: String!
    owner: ID!
    description: String
    capacity: Int
    Participants: [User!]!
  }

  type Query {
    events: [Event!]!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    nationality: String!
  }

  input CreateEventInput {
    title: String!
    description: String
    capacity: Int
    owner: ID!
  }

  type Mutation { 
    createEvent(input: CreateEventInput!): Boolean
    createUser(input: CreateUserInput!): Boolean
  }
`;