import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Student from './Student';

const StudentsList = ({ students }) => {
  return (
    <>
      <h1>All Students</h1>
      <Link to='/create-student'>
        <button>Add Student</button>
      </Link>
      <div id='all-students' className='grid-container'>
        {students.map((student) => (
          <Student student={student} key={student.id} />
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
