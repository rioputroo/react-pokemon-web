import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BASE_API_URL } from '../base/BaseUrl';

export const APOLLO_CLIENT_INSTANCE = new ApolloClient({
  uri: BASE_API_URL,
  cache: new InMemoryCache(),
});