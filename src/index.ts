import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import * as dotenv from 'dotenv';
import connectMongoDb from './database/mongodb';
import jwt from 'jsonwebtoken';

import { buildSchema } from "type-graphql";
import { LoginResolver } from './mutations/login';
import { EventResolver } from './queries/event';
import { CreateEventResolver } from './mutations/create-event';
import { CreateUserResolver } from './mutations/create-user';

dotenv.config();

export const schema = async () => 
  await buildSchema({
    resolvers: [
      LoginResolver,
      EventResolver,
      CreateEventResolver,
      CreateUserResolver
    ],
  });

let server: ApolloServer;

(async () => {
  await connectMongoDb();

  const builtSchema = await schema();
  server = new ApolloServer({ schema: builtSchema });

  const { url } = await startStandaloneServer(server, {
    context: async({ req }) => {
      const token = req.headers.authorization || '';
      if (!token) return { user: null };
      try{
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET as string);
        return { user: decoded };
      }catch(err){
        console.error(err);
        return { user: null };
      }
    }
  });
  console.log(`
    Server is running! 
    Query at ${url}`
  );
})();