import express, { Express, Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import dotenv from "dotenv";

dotenv.config();

let sampleWords = [
  {
    id: 1,
    word: "word 1.1",
    definition: "this is a def 1",
    example_sentence: "and this is an example 1",
  },
  {
    id: 2,
    word: "word 2",
    definition: "this is a def 2",
    example_sentence: "and this is an example 2",
  },
  {
    id: 3,
    word: "word 3",
    definition: "this is a def 3",
    example_sentence: "and this is an example 3",
  },
];

const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    definition: String!
    example_sentence: String
  }

  type Query {
    hello: String
    words: [Word!]!
    word(id: ID!): Word!
  }

  type Mutation {
    newWord(word: String!): Word!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world!";
    },

    words: () => {
      return sampleWords;
    },

    word: (parent: any, args: { id: number }) => {
      return sampleWords.find((word) => word.id == args.id);
    },
  },

  Mutation: {
    newWord: (parent: any, args: { word: any; }) => {
      let wordValue = {
        id: sampleWords.length + 1,
        word: args.word,
        definition: "bal",
        example_sentence: "blah blah"
      };
      sampleWords.push(wordValue);
      return wordValue;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const app: Express = express();
const port = process.env.PORT || 8080;

server.applyMiddleware({ app, path: "/api" });

app.listen(port, () => {
  console.log(`⚡️GraphQL server is running at http://localhost:${port}`);
});
