import React from 'react';
import { connect } from 'react-redux';

const Students = ({ students }) => {
  console.log('called from students:', students);
  return (
    <>
      <h1>All Students</h1>
      <div id='all-students' className='grid-container'>
        {students.map((student) => (
          <div key={student.id} className='grid-item-student'>
            <img src={student.imageUrl} className='portrait' />
            <h2>{student.fullName}</h2>
            <p>Campus Name</p>
          </div>
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

export default connect(mapStateToProps)(Students);
