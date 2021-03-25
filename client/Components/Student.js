import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from '../store/thunks/thunks';

const Student = ({ student, deleteStudent, campus, unregister }) => {
  //let { student, deleteStudent, campus, unregister } = props;
  //let studentImageUrl = student.imageUrl || '';
  //let studentFullName = student.fullName || '';
  // let studentId = student.id || 1;
  campus = campus || {};
  const deleteOrUnregister = student.studentListView ? (
    <>
      <p>{student.campusId ? campus.name : 'Unassigned to a campus'}</p>
      <button onClick={() => deleteStudent(student.id)}>delete</button>
    </>
  ) : (
    <button onClick={() => unregister(student.id, { campusId: null })}>
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
  const campus = state.campuses.find(
    (campus) => campus.id === otherProps.student.campusId
  );
  return {
    campus: campus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudent(id)),
    unregister: (id, student) => dispatch(updateStudent(id, student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
