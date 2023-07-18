import express, { Express, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import dotenv from 'dotenv';

dotenv.config();

const typeDefs = gql`
 type Query {
  hello: String
 }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!'
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers});
await server.start();

const app: Express = express();
const port = process.env.PORT || 8080;

server.applyMiddleware({app, path: '/api'});

app.listen(port, () => {
  console.log(`⚡️GraphQL server is running at http://localhost:${port}`);
});