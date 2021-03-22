import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Student from './Student';

const StudentsList = ({ students }) => {
  // console.log('called from students:', students);
  return (
    <>
      <h1>All Students</h1>
      <Link to='/create-student'>
        <button>Add Student</button>
      </Link>
      <div id='all-students' className='grid-container'>
        {students.map((student) => (
          <Link to={`/students/${student.id}`} key={student.id}>
            <Student student={student} />
          </Link>
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
