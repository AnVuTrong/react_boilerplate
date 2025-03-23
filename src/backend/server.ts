import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './graphql/schema.graphql';
import { resolvers } from './graphql/resolvers.graphql';
import { dataSource } from './data/dataSource.data';

const startServer = async () => {
  // Express and HTTP server setup
  const app = express();
  const httpServer = http.createServer(app);

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start Apollo Server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => ({
        dataSources: {
          dataSource,
        },
      }),
    }),
  );

  // Start the server
  const PORT = process.env.PORT || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

startServer().catch((err) => {
  console.error('Failed to start the server:', err);
}); 