import React from "react";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';



import Chat from "./components/Chat";
import Join from "./components/Join";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import { BrowserRouter as Router, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      {/* <Route path="/" exact component={Join} /> */}
      <Route path="/chat" component={Chat} />
    </Router>
    </ApolloProvider>
  );
};

export default App;
