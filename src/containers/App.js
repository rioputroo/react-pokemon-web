import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BaseRoute from '../components/BaseRoute';
import './App.css';

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <BaseRoute />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
