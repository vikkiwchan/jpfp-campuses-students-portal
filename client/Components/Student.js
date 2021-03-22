import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store/studentsReducer';

const Student = ({ student, deleteStudent }) => {
  //console.log('called from Student:', student);
  return (
    <div className='grid-item-student'>
      <img src={student.imageUrl} className='portrait' />
      <Link to={`/students/${student.id}`} key={student.id}>
        <h2>{student.fullName}</h2>
      </Link>
      <p>{student.campus ? student.campus.name : 'Unassigned to a campus'}</p>
      <button onClick={() => deleteStudent(student.id)}>delete</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudent(id)),
  };
};

export default connect(null, mapDispatchToProps)(Student);
