import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Student from './Student';
import Filter from './Filter';
import { sortLastName } from '../store/thunks/thunks';

const StudentsList = ({ students, sortLastName }) => {
  students = students || [];
  return (
    <>
      <h1>All Students</h1>
      <Filter view='students' />
      <div id='sort'>
        <button onClick={sortLastName}>Sort By Last Name</button>
      </div>
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
  const allStudents = state.students;
  const unregisteredStudents = state.students.filter(
    (student) => student.campusId === null
  );

  const filterFunc = (state) => {
    if (state.visFilter.students === 'SHOW_ALL') {
      return allStudents;
    }
    if (state.visFilter.students === 'SHOW_UNREGISTERED') {
      return unregisteredStudents;
    }
  };
  return {
    students: filterFunc(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortLastName: () => dispatch(sortLastName()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
