import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
      (!prevProps.campus.id && this.props.student.campusId) ||
      prevProps.campus.id !== this.props.student.campusId
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
    student = student || {};
    let { fullName, gpa, imageUrl, email, id } = student;
    id = id || '';

    if (!id) {
      return <NotFound />;
    }
    return (
      <div className='component-container'>
        <div className='body-info'>
          <img className='single-view' src={imageUrl} />
          <h1>{fullName}</h1>
          <div className='personal-info'>
            <p>{email}</p>
            <p>GPA: {gpa}</p>
          </div>
          <div className='button-set'>
            <div className='left-button'>
              <Button variant='contained' color='primary' size='medium'>
                <Link to={`/students/edit-student/${id}`}>edit</Link>
              </Button>
            </div>
            <div className='right-button'>
              <Button
                variant='contained'
                color='primary'
                size='medium'
                onClick={() => {
                  deleteStudent(id);
                }}
              >
                delete
              </Button>
            </div>
          </div>
          {student.campusId ? (
            <>
              <p>This student is registered at {student.campus.name}</p>
              <Campus campus={{ ...campus, campusListView: false }} />
            </>
          ) : (
            <p>This student is not registered to a campus yet</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.singleStudent,
    campus: state.singleCampus,
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
