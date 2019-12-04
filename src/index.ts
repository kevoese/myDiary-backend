import * as express from 'express';
import { ApolloServer,  gql } from 'apollo-server-express';
import * as cors from 'cors';
import databaseConnection from './database';
import { PORT } from './env';

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(PORT || 4000, () => {
  console.log(`server start at port ${PORT}`);
});

export default { app, databaseConnection };