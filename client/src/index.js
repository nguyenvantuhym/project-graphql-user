import React from 'react';
import ReactDOM from 'react-dom';
import Apolloclient from 'apollo-boost';
import  {ApolloProvider} from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import CreateUser from './components/create';
import Edit from './components/edit'
import Detail from './components/detail';

const client = new Apolloclient({ uri: 'http://localhost:9000/graphql'})
ReactDOM.render(
  <ApolloProvider client={client}>
  <Router>
    <Route exact path="/" component={App}></Route>
    <Route path="/edit/:id" component={Edit}></Route>
    <Route path="/create" component={CreateUser}></Route>
    <Route path="/show/:id" component={Detail}></Route>
  </Router>
    
  </ApolloProvider>
  ,
  document.getElementById('root')
);
