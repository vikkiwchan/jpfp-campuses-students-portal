import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Campus from './Campus';
import Filter from './Filter';
import SortCampuses from './SortCampuses';
import Footer from './Footer';

const CampusesList = ({ campuses }) => {
  if (!campuses.length) {
    return '...loading campuses';
  }
  return (
    <div>
      <h1>All Campuses</h1>
      <Filter view='campuses' />
      <SortCampuses />
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
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const allCampuses = state.campuses || [];
  const unregisteredCampuses = state.campuses.filter((campus) => {
    const students = campus.students || [];
    return !students.length;
  });

  const filterFunc = (state) => {
    if (state.visFilter.campuses === 'SHOW_ALL') {
      return allCampuses;
    }
    if (state.visFilter.campuses === 'SHOW_UNREGISTERED') {
      return unregisteredCampuses;
    }
  };

  return {
    campuses: filterFunc(state),
  };
};

export default connect(mapStateToProps)(CampusesList);
