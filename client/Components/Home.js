import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Home = () => (
  <div id='home-container'>
    <h1>{`Welcome to the USC \n Campuses and Students Portal!`}</h1>
    <div className='home-button-set'>
      <div className='left-button'>
        <Link to={'/campuses/add-campus'}>
          <Button variant='contained' color='secondary'>
            Add Campus
          </Button>
        </Link>
      </div>
      <div className='right-button'>
        <Link to='/students/add-student'>
          <Button variant='contained' color='secondary'>
            Add Student
          </Button>
        </Link>
      </div>
    </div>
    <img
      id='home'
      src='https://ktla.com/wp-content/uploads/sites/4/2020/05/GettyImages-1206596174.jpg?w=2560&h=1440&crop=1'
    />
  </div>
);

export default Home;
