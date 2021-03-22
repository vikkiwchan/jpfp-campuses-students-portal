import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <nav>
    <NavLink to='/' activeClassName='selected'>
      Home
    </NavLink>
    <NavLink to='/campuses' activeClassName='selected'>
      Campuses
    </NavLink>
    <NavLink to='/students' activeClassName='selected'>
      Students
    </NavLink>
  </nav>
);
