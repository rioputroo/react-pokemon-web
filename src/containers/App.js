import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import BaseRoute from '../base/BaseRoute';
import { APOLLO_CLIENT_INSTANCE } from '../graphql/GraphClient';
import './App.css';

function App() {
  return (
    <ApolloProvider client={APOLLO_CLIENT_INSTANCE}>
      <BrowserRouter>
        <div className="App">
          <BaseRoute />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
