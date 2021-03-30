import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sortLastName, sortGpa } from '../store/thunks/thunks';

const SortStudents = ({ sortLastName, sortGpa }) => {
  const [selected, setSelected] = useState({ lastName: '', gpa: '' });

  return (
    <div id='sort'>
      <label>
        <strong>Sort by: </strong>
      </label>
      <a
        className={selected.lastName}
        onClick={() => {
          sortLastName();
          setSelected({ lastName: 'selected', gpa: '' });
        }}
      >
        Last Name
      </a>
      <a>{', '}</a>
      <a
        className={selected.gpa}
        onClick={() => {
          sortGpa();
          setSelected({ lastName: '', gpa: 'selected' });
        }}
      >
        GPA
      </a>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortLastName: () => dispatch(sortLastName()),
    sortGpa: () => dispatch(sortGpa()),
  };
};

export default connect(null, mapDispatchToProps)(SortStudents);
