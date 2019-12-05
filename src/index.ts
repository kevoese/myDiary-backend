import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import databaseConnection from './database';
import { PORT } from './env';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const app = express();
app.use(cors());


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ token: req.headers.token })
});

server.applyMiddleware({ app });

app.listen(PORT || 4000, () => {
  console.log(`server start at port ${PORT}`);
});

export default { app, databaseConnection };