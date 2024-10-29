import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Step 1: Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',  // Update this to the actual URL of your GraphQL server
});

// Step 2: Set up authentication using headers (optional, if you use tokens)
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  const token = localStorage.getItem('id_token');
  
  // Return the headers with authorization if token exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Step 3: Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // In-memory cache for query responses
});

function App() {
  return (
    // Step 4: Wrap your app with ApolloProvider and pass the client
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
