import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Home = () => (
  <div id='home-container'>
    <h1 id='home-title'>
      Welcome to the
      <br />
      Campuses & Students <br />
      Portal for USC
    </h1>
    <div className='home-button-set'>
      <div className='left-button'>
        <Link to={'/campuses/add-campus'}>
          <Button variant='contained' color='secondary' size='large'>
            Add Campus
          </Button>
        </Link>
      </div>
      <div className='right-button'>
        <Link to='/students/add-student'>
          <Button variant='contained' color='secondary' size='large'>
            Add Student
          </Button>
        </Link>
      </div>
    </div>
    <img id='home-emoji' src='/trojan emoji.png' />
  </div>
);

export default Home;
