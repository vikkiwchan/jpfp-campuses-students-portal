import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Student from './Student';

const StudentsList = ({ students }) => {
  const [filter, setFilter] = useState('show-all');
  // console.log('useState', filter);
  if (filter === 'show-unregistered') {
    students = students.filter((student) => student.campusId === null);
  }

  return (
    <>
      <h1>All Students</h1>
      <select onChange={(event) => setFilter(event.target.value)}>
        <option value='show-all'>Show All Students</option>
        <option value='show-unregistered'>Show Unregistered Students</option>
      </select>
      <br />
      <Link to='/students/add-student'>
        <button>Add Student</button>
      </Link>
      <div id='all-students' className='grid-container'>
        {students.map((student) => (
          <Student
            student={{ ...student, studentListView: true }}
            key={student.id}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps)(StudentsList);
