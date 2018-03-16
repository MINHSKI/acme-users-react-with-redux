import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ()=> {
  return (
    <ul>
      <li>
        <Link to='/'>Users</Link>
      </li>
      <li>
        <Link to='/products'>Products</Link>
      </li>
      <li>
        <Link to='/users/create'>Create A User</Link>
      </li>
    </ul>
  );
};

export default Nav;
