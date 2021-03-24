import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Campus = ({ campus, students }) => {
  return (
    <div className='card'>
      <img src={campus.imageUrl} />
      <div>
        <Link to={`/campuses/${campus.id}`} key={campus.id}>
          <h2>{campus.name}</h2>
        </Link>
        <p>
          {students.length ? `Students (${students.length})` : 'No students'}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    campus:
      state.campuses.find((campus) => campus.id === otherProps.campusId) || {},
    students: state.students.filter(
      (student) => student.campusId === otherProps.campusId
    ),
  };
};
export default connect(mapStateToProps)(Campus);
