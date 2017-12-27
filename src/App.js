import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import routes from './routes'
import './App.css';

import Myheader from './components/Common/Myheader'
import Myfooter from './components/Common/Myfooter'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Myheader></Myheader>
            <div className="page">
              <Switch>
                {routes.map((route, i) => <Route key={i} exact={route.noexact ? false : true} path={route.path} component={route.component} />)}
              </Switch>
            </div>
            <Myfooter></Myfooter>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
