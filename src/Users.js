import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';

class Users extends Component{
  constructor(){
    super();
    this.state = {
      users: store.getState().users
    };
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(()=> {
      this.setState({ users: store.getState().users});
    });
  }
  render(){
    const { users } = this.state;
    return (
      <div>
      <h2>Users { users.length }</h2>
      <ul>
      {
        users.map( user => {
          return (
            <li key={ user.id }>
              <Link to={`/users/${user.id}`}>
                { user.name }
              </Link>
            </li>
          );
        })
      }
      </ul>
      </div>
    );
  }
};

export default Users;
