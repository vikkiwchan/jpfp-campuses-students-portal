import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampus } from '../store/thunks/thunks';
import Paper from '@material-ui/core/Paper';

const Campus = ({ campus, students, campusProps, deleteCampus }) => {
  const buttonsView = campusProps.campusListView ? (
    <div>
      <Link to={`/campuses/edit-campus/${campus.id}`}>
        <button>edit</button>
      </Link>
      <button onClick={() => deleteCampus(campus.id)}>delete</button>
    </div>
  ) : (
    <></>
  );
  students = students || {};
  return (
    <Paper>
      <div className='card'>
        <img src={campus.imageUrl} />
        <div>
          <Link to={`/campuses/${campus.id}`} key={campus.id}>
            <h2>{campus.name}</h2>
          </Link>
          <p>
            {students.length ? `Students (${students.length})` : 'No students'}
          </p>
          {buttonsView}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    campus:
      state.campuses.find(
        (campus) => campus.id === otherProps.campusProps.campusId
      ) || {},
    students: state.students.filter(
      (student) => student.campusId === otherProps.campusProps.campusId
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampus(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
