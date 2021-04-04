import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Pagination } from '@material-ui/lab';

import Campus from './Campus';

//set up function that handles URL queries
//set location to redirecton, create state for path location
// look at MDN URL search params

import { fetchCampuses, getPageCount } from '../store/thunks/thunks';

const CampusesList = ({ campuses, fetchCampuses }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [visFilter, setVisFilter] = useState('SHOW_ALL');
  // !! add state for re-render

  // load campus based on filter or sort selection
  useEffect(async () => {
    //console.log('----> useEffect', visFilter);
    fetchCampuses(page, visFilter);
    setCount(await getPageCount(page, visFilter));
    setVisFilter(visFilter);
  }, [visFilter, page]); // !! add state for re-render

  // reset page to 1 after filter choice has changes
  useEffect(() => {
    setPage(1);
  }, [visFilter]);

  const handleChange = (event, value) => {
    //console.log('----> handleChange', value);
    setPage(value);
  };

  const handleClick = (visFilter) => {
    setVisFilter(visFilter);
  };

  if (!campuses.length) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>All Campuses</h1>
      <div id='campuses-visFilter'>
        <label>
          <strong>Currently showing:&nbsp;</strong>
        </label>
        <a
          className={visFilter === 'SHOW_ALL' ? 'selected' : ''}
          onClick={() => handleClick('SHOW_ALL')}
        >
          All
        </a>
        <span>,&nbsp;</span>
        <a
          className={visFilter === 'SHOW_BY_STUDENTCOUNT' ? 'selected' : ''}
          onClick={() => handleClick('SHOW_BY_STUDENTCOUNT')}
        >
          Sort By Number of Registered Students
        </a>
        <br />
        <label>
          <strong>Filter:&nbsp;</strong>
        </label>
        <a
          className={visFilter === 'SHOW_UNREGISTERED' ? 'selected' : ''}
          onClick={() => handleClick('SHOW_UNREGISTERED')}
        >
          Unregistered to a Campus
        </a>
      </div>
      <br />
      <Link to={'/campuses/add-campus'}>
        <Button variant='contained' color='primary'>
          Add Campus
        </Button>
      </Link>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <div className='grid-item-campus' key={campus.id}>
            <Campus campus={{ ...campus, campusListView: true }} />
          </div>
        ))}
      </div>
      <div>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          shape='rounded'
          color='primary'
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampuses: (page, visFilter) =>
      dispatch(fetchCampuses(page, visFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusesList);
