import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent, unregisterStudent } from '../store/thunks/thunks';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Student = ({ student, deleteStudent, unregister }) => {
  student = student || {};
  const deleteOrUnregister = student.studentListView ? (
    <>
      <p>{student.campusId ? student.campus.name : 'Unassigned to a campus'}</p>
      <Button
        variant='contained'
        color='secondary'
        size='small'
        onClick={() => {
          deleteStudent(student.id);
        }}
      >
        delete
      </Button>
    </>
  ) : (
    <Button
      variant='contained'
      color='secondary'
      size='small'
      onClick={() => {
        unregister(student.id, { ...student, campusId: null });
      }}
    >
      unregister
    </Button>
  );
  return (
    <div className='grid-item-student'>
      <Paper>
        <div className='grid-item-card'>
          <img src={student.imageUrl} className='portrait' />
          <Link to={`/students/${student.id}`} key={student.id}>
            <h3>{student.fullName}</h3>
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
