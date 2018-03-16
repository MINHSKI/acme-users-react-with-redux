import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Users from './Users';
import UserForm from './UserForm';
import Products from './Products';
import Nav from './Nav';

import store from './store';

const App = ()=> {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
        <Route exact path='/' component={ Users } />
        <Route exact path='/products' component={ Products } />
        <Route exact path='/users/create' render={({ history })=> <UserForm history={ history }/> } />
        <Route exact path='/users/:id' render={({ match, history })=> <UserForm id={ match.params.id*1} history={ history }/> } />
        </Switch>
      </div>
    </Router>
  );
};

const users = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry' },
];

axios.get('/api/users')
  .then( result => result.data)
  .then( users => {
    store.dispatch({
      type: 'SET_USERS',
      users
    });
  });

export default App;
