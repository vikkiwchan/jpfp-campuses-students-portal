import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import Campus from './Campus';
import { fetchCampuses, getCampusesPageCount } from '../store/thunks/thunks';

const CampusesList = ({ campuses, fetchCampuses }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(11);
  const [visFilter, setVisFilter] = useState('SHOW_ALL');

  // load campus based on filter or sort selection
  useEffect(async () => {
    fetchCampuses(page, visFilter);
    setCount(await getCampusesPageCount(page, visFilter));
    setVisFilter(visFilter);
  }, [visFilter, page]);

  // reset page to 1 after filter choice has changed
  useEffect(() => {
    setPage(1);
  }, [visFilter]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (visFilter) => {
    setVisFilter(visFilter);
  };

  campuses = campuses || {};
  if (!campuses.length) {
    return '...Loading';
  }

  return (
    <div>
      <h1>All Campuses</h1>
      <div className='filter-control'>
        <div className='showing'>
          <label>
            <strong>Currently showing&nbsp;</strong>
          </label>
          <a> | </a>
          <a
            className={visFilter === 'SHOW_ALL' ? 'selected' : ''}
            onClick={() => handleClick('SHOW_ALL')}
          >
            All
          </a>
          <a> | </a>
          <a
            className={visFilter === 'SHOW_BY_STUDENTCOUNT' ? 'selected' : ''}
            onClick={() => handleClick('SHOW_BY_STUDENTCOUNT')}
          >
            Sort By Number of Registered Students
          </a>
        </div>
        <div className='filter'>
          <label>
            <strong>Filter&nbsp;</strong>
          </label>
          <a> | </a>
          <a
            className={visFilter === 'SHOW_UNREGISTERED' ? 'selected' : ''}
            onClick={() => handleClick('SHOW_UNREGISTERED')}
          >
            No Registered Students
          </a>
        </div>
        <div className='primary-button'>
          <Link to={'/campuses/add-campus'}>
            <Button variant='contained' color='primary' size='large'>
              Add Campus
            </Button>
          </Link>
        </div>
      </div>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <div className='grid-item-campus' key={campus.id}>
            <Campus campus={{ ...campus, campusListView: true }} />
          </div>
        ))}
      </div>
      <Box display='flex' justifyContent='center'>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          shape='rounded'
          color='primary'
          justify='center'
        />
      </Box>
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
