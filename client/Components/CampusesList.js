import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Campus from './Campus';

const CampusesList = ({ campuses }) => {
  return (
    <div>
      <h1>All Campuses</h1>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <Link to={`/campuses/${campus.id}`} key={campus.id}>
            <Campus campus={campus} />
          </Link>
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
