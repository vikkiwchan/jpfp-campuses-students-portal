import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent, unregisterStudent } from '../store/thunks/thunks';
import Paper from '@material-ui/core/Paper';

const Student = ({ student, deleteStudent, unregister }) => {
  student = student || {};
  const deleteOrUnregister = student.studentListView ? (
    <>
      <p>{student.campusId ? student.campus.name : 'Unassigned to a campus'}</p>
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
      <Paper>
        <div className='grid-item-card'>
          <img src={student.imageUrl} className='portrait' />
          <Link to={`/students/${student.id}`} key={student.id}>
            <h2>{student.fullName}</h2>
          </Link>
          {deleteOrUnregister}
        </div>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudent(id)),
    unregister: (id, student) => dispatch(unregisterStudent(id, student)),
  };
};

export default connect(null, mapDispatchToProps)(Student);
