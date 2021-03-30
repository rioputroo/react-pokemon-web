import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import BaseRoute from '../base/BaseRoute';
import { APOLLO_CLIENT_INSTANCE } from '../graphql/GraphClient';
import './App.css';
import Navbar from '../components/navbar/Navbar';

function App() {
  return (
    <ApolloProvider client={APOLLO_CLIENT_INSTANCE}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main className="MainContainer">
            <BaseRoute />
          </main>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
