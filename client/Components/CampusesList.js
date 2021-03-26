import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Campus from './Campus';

const CampusesList = ({ campuses }) => {
  const [filter, setFilter] = useState('show-all');
  if (filter === 'no-registered-students') {
    campuses = campuses.filter((campus) => !campus.students.length);
  }

  return (
    <div>
      <h1>All Campuses</h1>
      <select onChange={(event) => setFilter(event.target.value)}>
        <option value='show-all'>Show All Campuses</option>
        <option value='no-registered-students'>
          Show Campuses w/o Registered Students
        </option>
      </select>
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
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps)(CampusesList);
