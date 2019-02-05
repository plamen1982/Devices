import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; //binding react with apollo and inject data from the server into our app

//components
import DeviceList from './components/DeviceList';
import AddDevice from './components/AddDevice';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Device List:</h1>
          <DeviceList />
          <AddDevice />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
