import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import { typeDefs } from './typedefs.js';
import { resolvers } from './resolvers.js';
import * as dotenv from 'dotenv';
import connectMongoDb from './database/mongodb.js';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await connectMongoDb();

const { url } = await startStandaloneServer(server);
console.log(`
  Server is running! 
  Query at ${url}`
);