import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sortCampusesByStudents } from '../store/thunks/thunks';

const SortCampuses = ({ sortCampusesByStudents }) => {
  const [selected, setSelected] = useState({ sortCampusesByStudents: '' });

  return (
    <div id='sort'>
      <label>
        <strong>Sort by: </strong>
      </label>
      <a
        className={selected.sortCampusesByStudents}
        onClick={() => {
          sortCampusesByStudents();
          setSelected({ sortCampusesByStudents: 'selected' });
        }}
      >
        Enrolled Students Per Campus
      </a>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortCampusesByStudents: () => dispatch(sortCampusesByStudents()),
  };
};

export default connect(null, mapDispatchToProps)(SortCampuses);
