import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store/campusesReducer';

import Campus from './Campus';

const CampusesList = ({ campuses, deleteCampus }) => {
  return (
    <div>
      <h1>All Campuses</h1>
      <Link to='/create-campus'>
        <button>Add Campus</button>
      </Link>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <div className='grid-item-campus' key={campus.id}>
            <Campus campus={campus} />
            <div className='edit-delete'>
              <button>edit</button>
              <button onClick={() => deleteCampus(campus.id)}>delete</button>
            </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusesList);
