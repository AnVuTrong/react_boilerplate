import { ApolloClient, InMemoryCache } from '@apollo/client';

// Simple Apollo client setup with straightforward configuration
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // API endpoint
  cache: new InMemoryCache() // Simple in-memory cache
});

export default client; 