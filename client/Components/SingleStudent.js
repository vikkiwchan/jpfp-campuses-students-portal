import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchStudent,
  deleteStudent,
  fetchCampus,
} from '../store/thunks/thunks';
import Campus from './Campus';
import NotFound from './NotFound';

class SingleStudent extends Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.campus.id ||
      this.props.campus.id !== this.props.student.campusId
    ) {
      this.props.fetchCampus(this.props.student.campusId);
    }
    if (
      prevProps.match.params.studentId !== this.props.match.params.studentId
    ) {
      this.props.fetchStudent(this.props.match.params.studentId);
    }
  }

  render() {
    let { student, campus, deleteStudent } = this.props;
    campus = campus || {};
    const { fullName, gpa, imageUrl, email, id } = student;

    if (!student.id) {
      return <NotFound />;
    }
    return (
      <div id='single-student'>
        <div className='row-info'>
          <img src={imageUrl} />
          <div>
            <h2>{fullName}</h2>
            <p>{email}</p>
            <p>GPA: {gpa}</p>
            <Link to={`/students/edit-student/${id}`}>
              <button>edit</button>
            </Link>
            <button onClick={() => deleteStudent(id)}>delete</button>
          </div>
        </div>
        {campus.id ? (
          <>
            <p>This student is registered at {campus.name}</p>
            <Campus campus={{ ...campus, campusListView: false }} />
          </>
        ) : (
          <p>This student is not registered to a campus yet</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    student: state.singleStudent,
    campus: state.singleCampus,
    otherProps,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudent(id)),
    fetchCampus: (id) => dispatch(fetchCampus(id)),
    deleteStudent: (id) => dispatch(deleteStudent(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
