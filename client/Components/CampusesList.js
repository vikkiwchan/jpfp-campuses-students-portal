import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store/campusesReducer';

import Campus from './Campus';

const CampusesList = ({ campuses, deleteCampus }) => {
  return (
    <div>
      <h1>All Campuses</h1>
      <Link to={'/campuses/add-campus'}>
        <button>Add Campus</button>
      </Link>
      <div id='all-campuses' className='grid-container'>
        {campuses.map((campus) => (
          <div className='grid-item-campus' key={campus.id}>
            <Campus campusId={campus.id} />
            <div className='edit-delete'>
              <Link to={`/campuses/edit-campus/${campus.id}`}>
                <button>edit</button>
              </Link>
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
