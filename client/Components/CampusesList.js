import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Campus from './Campus';

const CampusesList = ({ campuses }) => {
  return (
    <div>
      <h1>All Campuses</h1>
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
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps)(CampusesList);
