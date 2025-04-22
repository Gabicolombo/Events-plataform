import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import * as dotenv from 'dotenv';
import connectMongoDb from './database/mongodb';
import jwt from 'jsonwebtoken';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await connectMongoDb();

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