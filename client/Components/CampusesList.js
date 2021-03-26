import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Campus from './Campus';
import Filter from './Filter';

const CampusesList = ({ campuses }) => {
  return (
    <div>
      <h1>All Campuses</h1>
      <Filter view='campuses' />
      <br />
      <Link to={'/campuses/add-campus'}>
        <button>Add Campus</button>
      </Link>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <div className='grid-item-campus' key={campus.id}>
            <Campus
              campusProps={{ campusId: campus.id, campusListView: true }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const allCampuses = state.campuses;
  const unregisteredCampuses = state.campuses.filter(
    (campus) => !campus.students.length
  );

  const filterFunc = (state) => {
    if (state.visFilter === 'SHOW_ALL') {
      return allCampuses;
    }
    if (state.visFilter === 'SHOW_UNREGISTERED') {
      return unregisteredCampuses;
    }
  };

  return {
    campuses: filterFunc(state),
  };
};

export default connect(mapStateToProps)(CampusesList);
