import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { BASE_URL } from './constants';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${BASE_URL}/graphql`,
  }),
});

export default client;
