import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent, unregisterStudent } from '../store/thunks/thunks';

const Student = ({ student, deleteStudent, campus, unregister }) => {
  campus = campus || {};
  const deleteOrUnregister = student.studentListView ? (
    <>
      <p>{student.campusId ? campus.name : 'Unassigned to a campus'}</p>
      <button onClick={() => deleteStudent(student.id)}>delete</button>
    </>
  ) : (
    <button
      onClick={() => unregister(student.id, { ...student, campusId: null })}
    >
      unregister
    </button>
  );
  return (
    <div className='grid-item-student'>
      <img src={student.imageUrl} className='portrait' />
      <Link to={`/students/${student.id}`} key={student.id}>
        <h2>{student.fullName}</h2>
      </Link>
      {deleteOrUnregister}
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    campus:
      state.campuses.find(
        (campus) => campus.id === otherProps.student.campusId
      ) || {},
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudent(id)),
    unregister: (id, student) => dispatch(unregisterStudent(id, student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
