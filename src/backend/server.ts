import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './graphql/schema.graphql';
import { resolvers } from './graphql/resolvers.graphql';
import { UserDataSource } from './data/User.dataSource';
import { TodoDataSource } from './data/Todo.dataSource';

// Define context type with our data sources
export interface MyContext {
  dataSources: {
    userDataSource: UserDataSource;
    todoDataSource: TodoDataSource;
  };
}

const startServer = async () => {
  // Create Express app and HTTP server
  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer<MyContext>({
    typeDefs,    // GraphQL schema
    resolvers,   // Resolver functions
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start the Apollo Server
  await server.start();

  // Set up middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        // Create data sources
        const userDataSource = new UserDataSource();
        const todoDataSource = new TodoDataSource();

        // Return context with data sources
        return {
          dataSources: {
            userDataSource,
            todoDataSource,
          },
        };
      },
    }),
  );

  // Start the server
  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

// Run the server
startServer().catch((err) => {
  console.error('Failed to start the server:', err);
}); 